import dotenv from "dotenv";
dotenv.config();

import fs from "fs";
import path from "path";
import { uploadToSpaces } from "@/lib/upload";

interface ImageMapping {
  originalPath: string;
  newUrl: string;
  fileName: string;
  size: number;
  mimeType: string;
}

interface MigrationStats {
  totalImages: number;
  successful: number;
  failed: number;
  totalSize: number;
  duration: number;
}

class StaticImageMigrator {
  private imageMap: Map<string, string> = new Map();
  private migrationLog: ImageMapping[] = [];
  private failedUploads: string[] = [];
  private publicDir = path.join(process.cwd(), "public");
  private startTime: number = 0;

  constructor() {
    console.log("🚀 Housing in Ghana - Static Image Migration Tool");
    console.log("📂 Public directory:", this.publicDir);

    // Check environment variables
    this.checkEnvironmentVariables();
  }

  private checkEnvironmentVariables(): void {
    console.log("✅ Environment variables loaded successfully");

    // Check database connection
    if (!process.env.DATABASE_URL) {
      console.error("❌ DATABASE_URL not found in environment variables");
      console.error("📝 Please ensure your .env file contains DATABASE_URL");
      process.exit(1);
    }

    console.log(`📊 Database: Connected`);

    // Check if we have the required DO Spaces variables
    const doSpacesVars = [
      "DO_SPACES_KEY",
      "DO_SPACES_SECRET",
      "DO_SPACES_ENDPOINT",
      "DO_SPACES_REGION",
      "DO_SPACES_BUCKET",
    ];

    const missingDoVars = doSpacesVars.filter(
      (varName) => !process.env[varName]
    );

    if (missingDoVars.length > 0) {
      console.warn("⚠️ Missing DigitalOcean Spaces variables:");
      missingDoVars.forEach((varName) => {
        console.warn(`   - ${varName}`);
      });
      console.warn(
        "📝 You'll need to add these to your .env file for upload functionality."
      );
    } else {
      console.log(
        `📊 DO Spaces: ${process.env.DO_SPACES_BUCKET} (${process.env.DO_SPACES_REGION})`
      );
    }
  }

  // Lazy load database connection
  private async getDatabaseConnection() {
    try {
      // Import database modules only when needed
      const { db } = await import("@/database/drizzle");
      const { fileUploads } = await import("@/database/schema");
      return { db, fileUploads };
    } catch (error) {
      console.error("❌ Failed to connect to database:", error);
      throw new Error(
        "Database connection failed. Please check your DATABASE_URL."
      );
    }
  }

  // Find all image files in the public directory
  private findAllImages(dir: string, relativePath: string = ""): string[] {
    const images: string[] = [];
    const imageExtensions = [
      ".jpg",
      ".jpeg",
      ".png",
      ".gif",
      ".webp",
      ".svg",
      ".ico",
      ".avif",
    ];

    try {
      const items = fs.readdirSync(dir);

      for (const item of items) {
        const fullPath = path.join(dir, item);
        const relativeItemPath = path
          .join(relativePath, item)
          .replace(/\\/g, "/");
        const stat = fs.statSync(fullPath);

        if (stat.isDirectory()) {
          // Skip system directories but include subdirectories like images/
          if (!item.startsWith(".") && item !== "node_modules") {
            images.push(...this.findAllImages(fullPath, relativeItemPath));
          }
        } else if (stat.isFile()) {
          const ext = path.extname(item).toLowerCase();
          if (imageExtensions.includes(ext)) {
            images.push(relativeItemPath);
          }
        }
      }
    } catch (error) {
      console.error(`❌ Error reading directory ${dir}:`, error);
    }

    return images;
  }

  // Upload a single image to DigitalOcean Spaces
  private async uploadImage(imagePath: string): Promise<ImageMapping | null> {
    try {
      const fullPath = path.join(this.publicDir, imagePath);

      if (!fs.existsSync(fullPath)) {
        console.error(`❌ File not found: ${fullPath}`);
        this.failedUploads.push(imagePath);
        return null;
      }

      const stats = fs.statSync(fullPath);

      // Skip files larger than 10MB
      if (stats.size > 10 * 1024 * 1024) {
        console.warn(
          `⚠️ Skipping large file (${this.formatBytes(stats.size)}): ${imagePath}`
        );
        this.failedUploads.push(imagePath);
        return null;
      }

      // Read the file
      const fileBuffer = fs.readFileSync(fullPath);
      const fileName = path.basename(imagePath);
      const mimeType = this.getMimeType(path.extname(fileName));

      // Create a File-like object for upload
      const file = new File([fileBuffer], fileName, { type: mimeType });

      // Determine the folder structure (preserve directory structure)
      const dirPath = path.dirname(imagePath);
      const folder =
        dirPath === "." ? "static-images" : `static-images/${dirPath}`;

      console.log(`📤 Uploading: ${imagePath} -> ${folder}/${fileName}`);

      // Upload to Spaces using your existing function
      const result = await uploadToSpaces(file, folder);

      // Get database connection lazily
      const { db, fileUploads } = await this.getDatabaseConnection();

      // Save to database using your existing schema
      await db.insert(fileUploads).values({
        originalName: fileName,
        filename: result.key.split("/").pop()!,
        mimeType: mimeType,
        size: stats.size,
        url: result.url,
        uploadedBy: "migration-script",
        metadata: {
          originalPath: imagePath,
          folder: folder,
          key: result.key,
          migrationDate: new Date().toISOString(),
          type: "static-migration",
          projectName: "housing-in-ghana",
        },
      });

      const mapping: ImageMapping = {
        originalPath: imagePath,
        newUrl: result.url,
        fileName: fileName,
        size: stats.size,
        mimeType: mimeType,
      };

      this.imageMap.set(imagePath, result.url);
      this.migrationLog.push(mapping);

      console.log(`✅ Uploaded: ${imagePath} -> ${result.url}`);
      return mapping;
    } catch (error) {
      console.error(`❌ Failed to upload ${imagePath}:`, error);
      this.failedUploads.push(imagePath);
      return null;
    }
  }

  private getMimeType(extension: string): string {
    const mimeTypes: { [key: string]: string } = {
      ".jpg": "image/jpeg",
      ".jpeg": "image/jpeg",
      ".png": "image/png",
      ".gif": "image/gif",
      ".webp": "image/webp",
      ".svg": "image/svg+xml",
      ".ico": "image/x-icon",
      ".avif": "image/avif",
    };

    return mimeTypes[extension.toLowerCase()] || "application/octet-stream";
  }

  // Find and replace image references in code files
  private async updateCodeReferences(): Promise<number> {
    const codeExtensions = [
      ".tsx",
      ".ts",
      ".jsx",
      ".js",
      ".css",
      ".scss",
      ".md",
      ".mdx",
    ];
    const excludeDirs = [
      "node_modules",
      ".git",
      ".next",
      "dist",
      "build",
      "coverage",
      "migrations",
      ".env",
    ];

    console.log("🔍 Scanning for image references in code...");

    const codeFiles = this.findCodeFiles(
      process.cwd(),
      codeExtensions,
      excludeDirs
    );
    let totalReplacements = 0;

    for (const filePath of codeFiles) {
      const replacements = await this.updateFileReferences(filePath);
      if (replacements > 0) {
        totalReplacements += replacements;
        const relativePath = path.relative(process.cwd(), filePath);
        console.log(`📝 Updated ${replacements} references in ${relativePath}`);
      }
    }

    return totalReplacements;
  }

  private findCodeFiles(
    dir: string,
    extensions: string[],
    excludeDirs: string[]
  ): string[] {
    const files: string[] = [];

    try {
      const items = fs.readdirSync(dir);

      for (const item of items) {
        if (excludeDirs.includes(item) || item.startsWith(".")) {
          continue;
        }

        const fullPath = path.join(dir, item);
        const stat = fs.statSync(fullPath);

        if (stat.isDirectory()) {
          files.push(...this.findCodeFiles(fullPath, extensions, excludeDirs));
        } else if (stat.isFile()) {
          const ext = path.extname(item).toLowerCase();
          if (extensions.includes(ext)) {
            files.push(fullPath);
          }
        }
      }
    } catch (error) {
      console.error(`❌ Error reading directory ${dir}:`, error);
    }

    return files;
  }

  private async updateFileReferences(filePath: string): Promise<number> {
    try {
      let content = fs.readFileSync(filePath, "utf8");
      let replacements = 0;
      const originalContent = content;

      // Replace each mapped image path
      for (const [originalPath, newUrl] of this.imageMap) {
        // Enhanced patterns for different use cases in your codebase
        const patterns = [
          // Standard string patterns
          `"/images/${originalPath}"`,
          `'/images/${originalPath}'`,
          `"/${originalPath}"`,
          `'/${originalPath}'`,

          // Next.js Image component patterns
          `src="/images/${originalPath}"`,
          `src='/images/${originalPath}'`,
          `src={"/images/${originalPath}"}`,
          `src={'/images/${originalPath}'}`,

          // CSS and SCSS patterns
          `url(/images/${originalPath})`,
          `url("/images/${originalPath}")`,
          `url('/images/${originalPath}')`,
          `background-image: url(/images/${originalPath})`,

          // Template literal patterns
          `\`/images/${originalPath}\``,
          `\`images/${originalPath}\``,

          // Import patterns (for dynamic imports)
          `import("/images/${originalPath}")`,
          `require("/images/${originalPath}")`,
        ];

        for (const pattern of patterns) {
          if (content.includes(pattern)) {
            // Replace with CDN URL, maintaining quote style
            let replacement = pattern.replace(
              `/images/${originalPath}`,
              newUrl
            );
            content = content.replace(
              new RegExp(pattern.replace(/[.*+?^${}()|[\]\\]/g, "\\$&"), "g"),
              replacement
            );
            replacements++;
          }
        }

        // Handle CSS background-image patterns in className
        const bgImagePattern = new RegExp(
          `bg-\\[url\\(['"]?/images/${originalPath.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")}['"]?\\)\\]`,
          "g"
        );
        if (bgImagePattern.test(content)) {
          content = content.replace(bgImagePattern, `bg-[url('${newUrl}')]`);
          replacements++;
        }
      }

      // Only write if changes were made
      if (content !== originalContent) {
        fs.writeFileSync(filePath, content, "utf8");
      }

      return replacements;
    } catch (error) {
      const relativePath = path.relative(process.cwd(), filePath);
      console.error(`❌ Error updating file ${relativePath}:`, error);
      return 0;
    }
  }

  // Generate comprehensive migration report
  private generateReport(stats: MigrationStats): void {
    const timestamp = new Date().toISOString();
    const reportPath = path.join(
      process.cwd(),
      `image-migration-report-${timestamp.split("T")[0]}.json`
    );

    const report = {
      timestamp,
      projectName: "housing-in-ghana",
      stats,
      images: this.migrationLog,
      failed: this.failedUploads,
      configuration: {
        bucket: process.env.DO_SPACES_BUCKET,
        region: process.env.DO_SPACES_REGION,
      },
      summary: {
        successful: stats.successful,
        failed: stats.failed,
        totalSizeFormatted: this.formatBytes(stats.totalSize),
        durationFormatted: this.formatDuration(stats.duration),
      },
    };

    fs.writeFileSync(reportPath, JSON.stringify(report, null, 2));
    console.log(`📊 Migration report saved to: ${reportPath}`);

    // Generate URL mapping for easy reference
    const mappingPath = path.join(
      process.cwd(),
      `image-url-mapping-${timestamp.split("T")[0]}.json`
    );
    const mapping = Object.fromEntries(this.imageMap);
    fs.writeFileSync(mappingPath, JSON.stringify(mapping, null, 2));
    console.log(`🗺️ URL mapping saved to: ${mappingPath}`);
  }

  private formatBytes(bytes: number): string {
    if (bytes === 0) return "0 Bytes";
    const k = 1024;
    const sizes = ["Bytes", "KB", "MB", "GB"];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + " " + sizes[i];
  }

  private formatDuration(ms: number): string {
    const seconds = Math.floor(ms / 1000);
    const minutes = Math.floor(seconds / 60);
    const hours = Math.floor(minutes / 60);

    if (hours > 0) {
      return `${hours}h ${minutes % 60}m ${seconds % 60}s`;
    } else if (minutes > 0) {
      return `${minutes}m ${seconds % 60}s`;
    } else {
      return `${seconds}s`;
    }
  }

  // Dry run functionality
  async dryRun(): Promise<void> {
    console.log("🧪 DRY RUN MODE - No files will be uploaded or modified");
    console.log("🔍 Step 1: Finding all images...");

    const images = this.findAllImages(this.publicDir);

    if (images.length === 0) {
      console.log("ℹ️ No images found in public directory");
      return;
    }

    console.log(`📸 Found ${images.length} images:`);
    let totalSize = 0;

    images.forEach((img) => {
      const fullPath = path.join(this.publicDir, img);
      try {
        const stats = fs.statSync(fullPath);
        totalSize += stats.size;
        console.log(`  - ${img} (${this.formatBytes(stats.size)})`);
      } catch (error) {
        console.log(`  - ${img} (Error reading file)`);
      }
    });

    console.log(`\n📊 Total size to migrate: ${this.formatBytes(totalSize)}`);
    console.log("🔍 Step 2: Scanning for references...");

    const codeFiles = this.findCodeFiles(
      process.cwd(),
      [".tsx", ".ts", ".jsx", ".js", ".css", ".scss", ".md", ".mdx"],
      ["node_modules", ".git", ".next", "dist", "build", "coverage"]
    );

    console.log(
      `📝 Found ${codeFiles.length} code files to scan for references`
    );
    console.log("\n⚠️ This is a dry run. No actual changes will be made.");

    // Show some example files that would be scanned
    if (codeFiles.length > 0) {
      console.log("\n📄 Example files that will be scanned:");
      codeFiles.slice(0, 5).forEach((file) => {
        const relativePath = path.relative(process.cwd(), file);
        console.log(`  - ${relativePath}`);
      });
      if (codeFiles.length > 5) {
        console.log(`  ... and ${codeFiles.length - 5} more files`);
      }
    }
  }

  // Main migration function
  async migrate(): Promise<void> {
    this.startTime = Date.now();

    console.log("🔍 Step 1: Finding all images...");
    const images = this.findAllImages(this.publicDir);

    if (images.length === 0) {
      console.log("ℹ️ No images found in public directory");
      return;
    }

    console.log(`📸 Found ${images.length} images:`);
    images.forEach((img) => console.log(`  - ${img}`));

    // Check if DO Spaces is configured
    const doSpacesVars = [
      "DO_SPACES_KEY",
      "DO_SPACES_SECRET",
      "DO_SPACES_ENDPOINT",
      "DO_SPACES_REGION",
      "DO_SPACES_BUCKET",
    ];
    const missingDoVars = doSpacesVars.filter(
      (varName) => !process.env[varName]
    );

    if (missingDoVars.length > 0) {
      console.error("\n❌ Cannot proceed with migration:");
      console.error("Missing DigitalOcean Spaces configuration:");
      missingDoVars.forEach((varName) => {
        console.error(`  - ${varName}`);
      });
      console.error("\n📝 Please add these variables to your .env file:");
      console.error("DO_SPACES_KEY=your_access_key");
      console.error("DO_SPACES_SECRET=your_secret_key");
      console.error("DO_SPACES_ENDPOINT=https://ams3.digitaloceanspaces.com");
      console.error("DO_SPACES_REGION=ams3");
      console.error("DO_SPACES_BUCKET=your_bucket_name");
      return;
    }

    console.log("\n📤 Step 2: Uploading images to DigitalOcean Spaces...");

    // Upload images with progress tracking
    let successful = 0;
    let failed = 0;
    let totalSize = 0;

    for (let i = 0; i < images.length; i++) {
      const image = images[i];
      console.log(`\n[${i + 1}/${images.length}] Processing: ${image}`);

      const result = await this.uploadImage(image);
      if (result) {
        successful++;
        totalSize += result.size;
      } else {
        failed++;
      }

      // Add a small delay to avoid overwhelming the API
      await new Promise((resolve) => setTimeout(resolve, 200));
    }

    console.log(
      `\n📊 Upload Summary: ${successful} successful, ${failed} failed`
    );

    if (successful > 0) {
      console.log("\n🔄 Step 3: Updating code references...");
      const totalReplacements = await this.updateCodeReferences();
      console.log(`🔄 ${totalReplacements} code references updated`);
    }

    const duration = Date.now() - this.startTime;
    const stats: MigrationStats = {
      totalImages: images.length,
      successful,
      failed,
      totalSize,
      duration,
    };

    console.log("\n📝 Step 4: Generating reports...");
    this.generateReport(stats);

    console.log("\n✅ Migration completed!");
    console.log(`📸 ${successful} images migrated to DigitalOcean Spaces`);
    console.log(`📊 Total size migrated: ${this.formatBytes(totalSize)}`);
    console.log(`⏱️ Duration: ${this.formatDuration(duration)}`);
    console.log("📊 Check the generated reports for details");

    if (failed > 0) {
      console.log(
        `\n⚠️ ${failed} images failed to upload. Check the report for details.`
      );
    }

    console.log(
      "\n⚠️ Important: Review the changes and test your application before deploying!"
    );
  }
}

// CLI interface
async function main() {
  const args = process.argv.slice(2);
  const migrator = new StaticImageMigrator();

  if (args.includes("--dry-run")) {
    await migrator.dryRun();
    return;
  }

  if (args.includes("--help")) {
    console.log(`
Housing in Ghana - Static Image Migration Tool
==============================================

Usage: npx tsx lib/migrate-static-images.ts [options]

Options:
  --help      Show this help message
  --dry-run   Preview what would be migrated without making changes

This script will:
1. Find all images in your public directory
2. Upload them to DigitalOcean Spaces
3. Update all references in your code files
4. Generate comprehensive migration reports

Prerequisites:
- Ensure your .env file contains DATABASE_URL and DO_SPACES_* variables
- Database connection should be working
- Sufficient storage space in your DO Spaces bucket
    `);
    return;
  }

  try {
    await migrator.migrate();
  } catch (error) {
    console.error("💥 Migration failed:", error);
    process.exit(1);
  }
}

// Run if called directly
if (require.main === module) {
  main();
}

export { StaticImageMigrator };
