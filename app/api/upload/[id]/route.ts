import { eq } from "drizzle-orm";
import { db } from "@/database/drizzle";
import { NextRequest, NextResponse } from "next/server";
import { fileUploads } from "@/database/schema";
import { deleteFromSpaces, extractKeyFromUrl } from "@/lib/upload";

export async function DELETE(
  request: NextRequest,
  context: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await context.params;

    // Get file record from database
    const [fileRecord] = await db
      .select()
      .from(fileUploads)
      .where(eq(fileUploads.id, id))
      .limit(1);

    if (!fileRecord) {
      return NextResponse.json({ error: "File not found" }, { status: 404 });
    }

    // Extract key from URL and delete from Spaces
    const key = extractKeyFromUrl(fileRecord.url);

    if (!key) {
      return null;
    } else {
      try {
        await deleteFromSpaces(key);
        console.log("trigered deleting from spaces!", key);
      } catch (error) {
        console.log("Deleting route error!", error);
        return;
      } finally {
        // Delete from database
        // await db.delete(fileUploads).where(eq(fileUploads.id, id));
      }
    }

    return NextResponse.json({
      success: true,
      message: "File deleted successfully",
    });
  } catch (error) {
    console.error("Delete error:", error);
    return NextResponse.json(
      { error: "Failed to delete file" },
      { status: 500 }
    );
  }
}
