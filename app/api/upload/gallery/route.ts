import { NextRequest, NextResponse } from "next/server";
import {
  uploadToSpaces,
  validateFile,
  ALLOWED_IMAGE_TYPES,
} from "@/lib/upload";
import { uploadSchema } from "@/lib/validations";
import { fileUploads } from "@/database/schema";
import { db } from "@/database/drizzle";

export async function POST(request: NextRequest) {
  try {
    // Check if required environment variables are present
    const requiredEnvVars = [
      "DO_SPACES_KEY",
      "DO_SPACES_SECRET",
      "DO_SPACES_ENDPOINT",
      "DO_SPACES_REGION",
      "DO_SPACES_BUCKET",
    ];

    const missingEnvVars = requiredEnvVars.filter(
      (envVar) => !process.env[envVar]
    );
    if (missingEnvVars.length > 0) {
      console.error("Missing environment variables:", missingEnvVars);
      return NextResponse.json(
        {
          error: `Missing environment variables: ${missingEnvVars.join(", ")}`,
        },
        { status: 500 }
      );
    }

    const formData = await request.formData();
    const files = formData.getAll("files") as File[];
    const type = (formData.get("type") as string) || "image";
    const folder = (formData.get("folder") as string) || "uploads";

    // Validate input
    const validatedData = uploadSchema.parse({ type, folder });

    if (!files || files.length === 0) {
      return NextResponse.json({ error: "No files provided" }, { status: 400 });
    }

    const uploadResults = [];
    const errors = [];

    for (let i = 0; i < files.length; i++) {
      const file = files[i];

      try {
        // Validate file
        const validationError = validateFile(file, ALLOWED_IMAGE_TYPES);
        if (validationError) {
          errors.push({ file: file.name, error: validationError });
          continue;
        }

        // Upload to Spaces
        const uploadResult = await uploadToSpaces(file, validatedData.folder);

        // Save to database
        const [fileRecord] = await db
          .insert(fileUploads)
          .values({
            originalName: uploadResult.originalName,
            filename: uploadResult.key.split("/").pop()!,
            mimeType: uploadResult.mimeType,
            size: uploadResult.size,
            url: uploadResult.url,
            uploadedBy: "system",
            metadata: {
              folder: validatedData.folder,
              type: validatedData.type,
              key: uploadResult.key,
            },
          })
          .returning();

        uploadResults.push({
          id: fileRecord.id,
          url: fileRecord.url,
          originalName: fileRecord.originalName,
          size: fileRecord.size,
          mimeType: fileRecord.mimeType,
        });
      } catch (error) {
        console.error(`Error uploading ${file.name}:`, error);
        const errorMessage =
          error instanceof Error ? error.message : "Upload failed";
        errors.push({ file: file.name, error: errorMessage });
      }
    }

    return NextResponse.json({
      success: true,
      data: uploadResults,
      errors: errors.length > 0 ? errors : undefined,
    });
  } catch (error) {
    console.error("Gallery upload error:", error);
    return NextResponse.json(
      { error: "Failed to upload files" },
      { status: 500 }
    );
  }
}
