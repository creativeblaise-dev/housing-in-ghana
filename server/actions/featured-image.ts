"use server";
import { db } from "@/database/drizzle";
import { eq } from "drizzle-orm";
import { article, fileUploads } from "@/database/schema";

const editFeaturedImage = async ({
  articleId,
}: {
  articleId: string | undefined;
}) => {
  console.log("🗑️ Removing featured image for Article Id:", articleId);

  if (!articleId) {
    console.log("❌ No article ID provided");
    return { success: false, message: "No article ID provided" };
  }

  try {
    // 1. Get the current article with featured image info
    const [currentArticle] = await db
      .select()
      .from(article)
      .where(eq(article.id, articleId))
      .limit(1);

    if (!currentArticle) {
      console.log("❌ Article not found");
      return { success: false, message: "Article not found" };
    }

    console.log("📄 Current article:", {
      id: currentArticle.id,
      title: currentArticle.title,
      featuredImageUrl: currentArticle.featuredImageUrl,
    });

    // 2. If there's no featured image, nothing to remove
    if (!currentArticle.featuredImageUrl) {
      console.log("ℹ️ No featured image to remove");
      return { success: true, message: "No featured image to remove" };
    }

    // 3. Find the file record in fileUploads table by URL
    const [fileRecord] = await db
      .select()
      .from(fileUploads)
      .where(eq(fileUploads.url, currentArticle.featuredImageUrl))
      .limit(1);

    // 4. Remove featured image URL from article
    await db
      .update(article)
      .set({
        featuredImageUrl: null,
      })
      .where(eq(article.id, articleId));

    console.log("✅ Removed featured image URL from article");

    // 5. If file record exists, delete it from fileUploads table and DO Spaces
    if (fileRecord) {
      console.log("📁 Found file record:", {
        id: fileRecord.id,
        filename: fileRecord.filename,
        url: fileRecord.url,
      });

      // Delete from fileUploads table and DO Spaces directly
      try {
        // Import the necessary functions
        const { deleteFromSpaces, extractKeyFromUrl } = await import(
          "@/lib/upload"
        );

        // Determine the key for deletion
        let key: string;
        const metadata = fileRecord.metadata as any;

        if (metadata?.key) {
          key = metadata.key;
          console.log("✅ Using key from metadata:", key);
        } else if (metadata?.folder && fileRecord.filename) {
          key = `${metadata.folder}/${fileRecord.filename}`;
          console.log("✅ Reconstructed key from metadata:", key);
        } else {
          const extractedKey = extractKeyFromUrl(fileRecord.url);
          key = extractedKey || `articles/${fileRecord.filename}`;
          console.log("✅ Using extracted/fallback key:", key);
        }

        // Delete from DO Spaces
        try {
          await deleteFromSpaces(key);
          console.log("✅ Successfully deleted from Spaces");
        } catch (spacesError) {
          console.error("⚠️ Failed to delete from Spaces:", spacesError);
          // Continue with database cleanup even if Spaces deletion fails
        }

        // Delete from database
        await db.delete(fileUploads).where(eq(fileUploads.id, fileRecord.id));
        console.log("✅ Successfully deleted from database");
      } catch (deleteError) {
        console.error("❌ Error during file deletion:", deleteError);
        // Still try to delete from database as fallback
        try {
          await db.delete(fileUploads).where(eq(fileUploads.id, fileRecord.id));
          console.log("✅ Deleted file record from database as fallback");
        } catch (dbError) {
          console.error("❌ Failed to delete from database:", dbError);
        }
      }
    } else {
      console.log(
        "⚠️ No file record found in database for URL:",
        currentArticle.featuredImageUrl
      );
    }

    return {
      success: true,
      message: "Featured image removed successfully",
      removedImageUrl: currentArticle.featuredImageUrl,
    };
  } catch (error) {
    console.error("❌ Error removing featured image:", error);
    return {
      success: false,
      message:
        error instanceof Error ? error.message : "Unknown error occurred",
    };
  }
};

export default editFeaturedImage;
