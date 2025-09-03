import { NextRequest, NextResponse } from "next/server";
import { db } from "@/database/drizzle";
import { fileUploads } from "@/database/schema";
import {
  uploadToSpaces,
  validateFile,
  ALLOWED_IMAGE_TYPES,
  ALLOWED_DOCUMENT_TYPES,
} from "@/lib/upload";
import { uploadSchema } from "@/lib/validations";

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();
    const file = formData.get("file") as File;
    const type = (formData.get("type") as string) || "image";
    const folder = (formData.get("folder") as string) || "uploads";

    // Validate input
    const validatedData = uploadSchema.parse({ type, folder });

    if (!file) {
      return NextResponse.json({ error: "No file provided" }, { status: 400 });
    }

    // Determine allowed file types
    const allowedTypes =
      validatedData.type === "image"
        ? ALLOWED_IMAGE_TYPES
        : [...ALLOWED_IMAGE_TYPES, ...ALLOWED_DOCUMENT_TYPES];

    // Validate file
    const validationError = validateFile(file, allowedTypes);
    if (validationError) {
      return NextResponse.json({ error: validationError }, { status: 400 });
    }

    // Upload to DigitalOcean Spaces
    const uploadResult = await uploadToSpaces(file, validatedData.folder);

    // Save to database
    const [fileRecord] = await db
      .insert(fileUploads)
      .values({
        originalName: uploadResult.originalName,
        filename: uploadResult.key.split("/").pop()!, // Just filename: "abc123.jpg"
        mimeType: uploadResult.mimeType,
        size: uploadResult.size,
        url: uploadResult.url,
        uploadedBy: "system",
        metadata: {
          folder: folder,
          fullKey: uploadResult.key, // Store complete key: "housinginghana/articles/abc123.jpg"
          type: "image",
          bucketStructure: "nested", // Mark this for future reference
        },
      })
      .returning();

    return NextResponse.json({
      success: true,
      data: {
        id: fileRecord.id,
        url: fileRecord.url,
        originalName: fileRecord.originalName,
        size: fileRecord.size,
        mimeType: fileRecord.mimeType,
      },
    });
  } catch (error) {
    console.error("Upload error:", error);
    return NextResponse.json(
      { error: "Failed to upload file!!!" },
      { status: 500 }
    );
  }
}
