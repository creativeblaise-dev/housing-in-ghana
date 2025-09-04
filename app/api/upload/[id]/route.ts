import { eq } from "drizzle-orm";
import { db } from "@/database/drizzle";
import { NextRequest, NextResponse } from "next/server";
import { fileUploads } from "@/database/schema";
import { deleteFromSpaces, extractKeyFromUrl } from "@/lib/upload";
import { spacesClient } from "@/lib/spaces";
import { HeadObjectCommand } from "@aws-sdk/client-s3";

export async function DELETE(
  request: NextRequest,
  context: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await context.params;

    console.log("🗑️ DELETE request for file ID:", id);

    const [fileRecord] = await db
      .select()
      .from(fileUploads)
      .where(eq(fileUploads.id, id))
      .limit(1);

    if (!fileRecord) {
      console.log("❌ File not found in database:", id);
      return NextResponse.json({ error: "File not found" }, { status: 404 });
    }

    console.log("📁 Found file record:", {
      id: fileRecord.id,
      filename: fileRecord.filename,
      url: fileRecord.url,
      metadata: fileRecord.metadata,
    });

    // FOR YOUR NESTED STRUCTURE: housinginghana/housinginghana/articles/file.jpg
    let key: string;

    // Method 1: Try to get key from metadata
    const metadata = fileRecord.metadata as any;
    if (metadata?.key) {
      key = metadata.key;
      console.log("✅ Using key from metadata:", key);
    }
    // Method 2: Try to reconstruct from metadata folder + filename
    else if (metadata?.folder && fileRecord.filename) {
      // For your structure: housinginghana + articles + filename
      key = `${metadata.folder}/${fileRecord.filename}`;
      console.log("✅ Reconstructed key from metadata:", key);
    }
    // Method 3: Try URL extraction
    else {
      const extractedKey = extractKeyFromUrl(fileRecord.url);
      if (extractedKey) {
        // If extracted key doesn't start with bucket name, add the nested folder
        if (!extractedKey.startsWith("housinginghana/")) {
          key = `${extractedKey}`;
        } else {
          key = extractedKey;
        }
        console.log("✅ Using URL extraction with bucket prefix:", key);
      } else {
        // Last resort: assume articles folder structure
        key = `articles/${fileRecord.filename}`;
        console.log("✅ Using fallback key structure:", key);
      }
    }

    console.log("🗑️ Final key for deletion:", key);
    console.log("🪣 Bucket:", process.env.DO_SPACES_BUCKET);

    // Test if file exists before deletion
    try {
      const headResult = await spacesClient.send(
        new HeadObjectCommand({
          Bucket: process.env.DO_SPACES_BUCKET!,
          Key: key,
        })
      );

      console.log("✅ File exists in Spaces:", {
        size: headResult.ContentLength,
        contentType: headResult.ContentType,
        lastModified: headResult.LastModified,
      });
    } catch (headError) {
      if (headError === "NotFound") {
        console.warn("⚠️ File not found in Spaces with key:", key);
      } else {
        console.error("❌ Error checking file existence:", headError);
      }
    }

    // Delete from Spaces
    try {
      await deleteFromSpaces(key);
      console.log("✅ Successfully deleted from Spaces");
    } catch (spacesError) {
      console.error("⚠️ Failed to delete from Spaces:", spacesError);
      // Don't fail the entire operation - continue with database cleanup
    }

    const actionAfterDelay = async () => {
      //Delete from database
      await db.delete(fileUploads).where(eq(fileUploads.id, id));
      console.log("✅ Successfully deleted from database");
      console.log("This action is performed after the timeout!");
    };

    setTimeout(actionAfterDelay, 3000); // Executes actionAfterDelay after 5000 milliseconds (5 seconds)

    return NextResponse.json({
      success: true,
      message: "File deleted successfully",
      deletedFile: {
        id: fileRecord.id,
        filename: fileRecord.filename,
        keyUsed: key,
        originalUrl: fileRecord.url,
      },
    });
  } catch (error) {
    console.error("❌ Delete error:", error);
    return NextResponse.json(
      {
        error: "Failed to delete file",
        details: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 }
    );
  }
}
