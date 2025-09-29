import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import {
  S3Client,
  PutObjectCommand,
  ObjectCannedACL,
} from "@aws-sdk/client-s3";
import { v4 as uuidv4 } from "uuid";
import dotenv from "dotenv";

// Load environment variables
dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Create spaces client directly with explicit region
const spacesClient = new S3Client({
  endpoint: process.env.DO_SPACES_ENDPOINT!,
  region: process.env.DO_SPACES_REGION || "ams3", // Explicit region with fallback
  forcePathStyle: false,
  credentials: {
    accessKeyId: process.env.DO_SPACES_KEY!,
    secretAccessKey: process.env.DO_SPACES_SECRET!,
  },
});

// Simplified upload function using the same logic as your uploadToSpaces
async function uploadFileToSpaces(
  file: File,
  folder: string = "static-images"
) {
  const fileExtension = path.extname(file.name);
  const fileName = `${uuidv4()}${fileExtension}`;
  const key = `${folder}/${fileName}`;

  const buffer = await file.arrayBuffer();

  const uploadParams = {
    Bucket: process.env.DO_SPACES_BUCKET!,
    Key: key,
    Body: Buffer.from(buffer),
    ContentType: file.type,
    ACL: ObjectCannedACL.public_read,
    CacheControl: "max-age=31536000", // 1 year cache
  };

  try {
    await spacesClient.send(new PutObjectCommand(uploadParams));

    // Use CDN endpoint if available, otherwise use the direct URL
    let url: string;
    if (process.env.DO_SPACES_CDN_ENDPOINT) {
      url = `${process.env.DO_SPACES_CDN_ENDPOINT}/${key}`;
    } else {
      url = `${process.env.DO_SPACES_ENDPOINT}/${process.env.DO_SPACES_BUCKET}/${key}`;
    }

    return {
      url,
      key,
      originalName: file.name,
      size: file.size,
      mimeType: file.type,
    };
  } catch (error) {
    console.error("Upload failed:", error);
    throw new Error("Failed to upload file to DigitalOcean Spaces");
  }
}

// Convert file system file to File object for uploadToSpaces
function createFileFromPath(filePath: string): File {
  const fileContent = fs.readFileSync(filePath);
  const fileName = path.basename(filePath);
  const stats = fs.statSync(filePath);

  // Determine mime type
  const ext = path.extname(filePath).toLowerCase();
  const mimeTypes: Record<string, string> = {
    ".jpg": "image/jpeg",
    ".jpeg": "image/jpeg",
    ".png": "image/png",
    ".gif": "image/gif",
    ".webp": "image/webp",
    ".svg": "image/svg+xml",
    ".ico": "image/x-icon",
  };

  const mimeType = mimeTypes[ext] || "application/octet-stream";

  // Create a File-like object
  const file = new File([fileContent], fileName, {
    type: mimeType,
    lastModified: stats.mtime.getTime(),
  });

  return file;
}

async function walkDirectory(
  dir: string,
  baseDir = ""
): Promise<
  Array<{ localPath: string; relativePath: string; fileName: string }>
> {
  const files: Array<{
    localPath: string;
    relativePath: string;
    fileName: string;
  }> = [];
  const items = fs.readdirSync(dir);

  for (const item of items) {
    const fullPath = path.join(dir, item);
    const stat = fs.statSync(fullPath);

    if (stat.isDirectory()) {
      const subFiles = await walkDirectory(fullPath, path.join(baseDir, item));
      files.push(...subFiles);
    } else {
      // Only process image files
      const ext = path.extname(item).toLowerCase();
      const imageExtensions = [
        ".jpg",
        ".jpeg",
        ".png",
        ".gif",
        ".webp",
        ".svg",
        ".ico",
      ];

      if (imageExtensions.includes(ext)) {
        files.push({
          localPath: fullPath,
          relativePath: path.join(baseDir, item).replace(/\\/g, "/"),
          fileName: item,
        });
      }
    }
  }

  return files;
}

async function main() {
  try {
    console.log("🚀 Starting static images upload to DigitalOcean Spaces...");
    console.log("📋 Using direct S3 client configuration\n");

    // Validate environment variables
    const requiredEnvVars = [
      "DO_SPACES_ENDPOINT",
      "DO_SPACES_BUCKET",
      "DO_SPACES_KEY",
      "DO_SPACES_SECRET",
    ];

    const missingVars = requiredEnvVars.filter(
      (varName) => !process.env[varName]
    );
    if (missingVars.length > 0) {
      console.error(
        "❌ Missing required environment variables:",
        missingVars.join(", ")
      );
      process.exit(1);
    }

    console.log(
      `📍 Using region: ${process.env.DO_SPACES_REGION || "us-east-1"}`
    );
    console.log(`📡 Endpoint: ${process.env.DO_SPACES_ENDPOINT}`);
    console.log(`🪣 Bucket: ${process.env.DO_SPACES_BUCKET}`);

    const publicDir = path.join(__dirname, "../public");

    if (!fs.existsSync(publicDir)) {
      console.error("❌ Public directory not found:", publicDir);
      process.exit(1);
    }

    const imageFiles = await walkDirectory(publicDir);
    console.log(`📁 Found ${imageFiles.length} image files to upload`);

    if (imageFiles.length === 0) {
      console.log("ℹ️  No image files found in public directory");
      return;
    }

    const results: Array<{
      key: string;
      url: string;
      originalName: string;
      size: number;
      mimeType: string;
      localPath: string;
    }> = [];

    const failed: Array<{ file: string; error: string }> = [];
    const batchSize = 3;

    for (let i = 0; i < imageFiles.length; i += batchSize) {
      const batch = imageFiles.slice(i, i + batchSize);
      console.log(
        `\n📤 Processing batch ${Math.floor(i / batchSize) + 1}/${Math.ceil(imageFiles.length / batchSize)}`
      );

      // Process files one by one to avoid overwhelming the connection
      for (const fileInfo of batch) {
        try {
          console.log(`   📸 Uploading: ${fileInfo.fileName}`);

          // Create File object from filesystem file
          const file = createFileFromPath(fileInfo.localPath);

          // Use our simplified upload function
          const result = await uploadFileToSpaces(file, "static-images");

          results.push({
            ...result,
            localPath: fileInfo.localPath,
          });

          console.log(`   ✅ Success: ${result.url}`);
        } catch (error) {
          const errorMessage =
            error instanceof Error ? error.message : "Unknown error";
          console.error(`   ❌ Failed: ${fileInfo.fileName} - ${errorMessage}`);
          failed.push({
            file: fileInfo.fileName,
            error: errorMessage,
          });
        }

        // Small delay between uploads
        await new Promise((resolve) => setTimeout(resolve, 800));
      }

      // Longer delay between batches
      if (i + batchSize < imageFiles.length) {
        console.log("   ⏳ Waiting before next batch...");
        await new Promise((resolve) => setTimeout(resolve, 2000));
      }
    }

    console.log(
      `\n✅ Upload complete! ${results.length}/${imageFiles.length} files uploaded successfully`
    );

    if (failed.length > 0) {
      console.log(`\n❌ Failed uploads (${failed.length}):`);
      failed.forEach((f) => console.log(`   - ${f.file}: ${f.error}`));
    }

    // Generate a mapping file for easy reference
    const mapping: Record<string, string> = {};

    results.forEach((result) => {
      // Create mapping from local public path to CDN URL
      const relativePath = path
        .relative(path.join(__dirname, "../public"), result.localPath)
        .replace(/\\/g, "/");

      const localPath = `/${relativePath}`;
      mapping[localPath] = result.url;
    });

    const mappingPath = path.join(__dirname, "../static-images-mapping.json");
    fs.writeFileSync(mappingPath, JSON.stringify(mapping, null, 2));

    console.log("\n📝 Image URL mapping saved to static-images-mapping.json");
    console.log(
      `📊 Total size uploaded: ${(results.reduce((acc, r) => acc + r.size, 0) / 1024 / 1024).toFixed(2)} MB`
    );

    // Show sample mappings
    console.log("\n📋 Sample URL mappings:");
    Object.entries(mapping)
      .slice(0, 3)
      .forEach(([local, cdn]) => {
        console.log(`   ${local} → ${cdn}`);
      });

    if (Object.keys(mapping).length > 3) {
      console.log(`   ... and ${Object.keys(mapping).length - 3} more`);
    }
  } catch (error) {
    console.error("❌ Upload failed:", error);
    process.exit(1);
  }
}

main();
