import React from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import ArticleForm from "@/components/admin/forms/ArticleForm";
import { db } from "@/database/drizzle";
import { article, fileUploads } from "@/database/schema";
import { eq } from "drizzle-orm";
import { JSONContent } from "@tiptap/react";

const page = async ({ params }: { params: Promise<{ slug: string }> }) => {
  const { slug } = await params;

  const [existingArticle] = await db
    .select()
    .from(article)
    .where(eq(article.slug, slug))
    .limit(1);

  // Get featured image data if it exists
  let featuredImageData = null;
  if (existingArticle?.featuredImageUrl) {
    const [fileRecord] = await db
      .select()
      .from(fileUploads)
      .where(eq(fileUploads.url, existingArticle.featuredImageUrl))
      .limit(1);

    if (fileRecord) {
      featuredImageData = {
        id: fileRecord.id,
        url: fileRecord.url,
        originalName: fileRecord.originalName,
      };
    }
  }

  // Convert to plain object
  const plainArticle = existingArticle
    ? JSON.parse(JSON.stringify(existingArticle))
    : null;

  return (
    <main>
      <Button className="mr-2 bg-[#ffffff] border-1 text-stone-600 cursor-pointer mb-4">
        <Link href="/admin/articles">Back to Articles</Link>
      </Button>
      <h1>New Article Form</h1>
      <div className="flex flex-col md:flex-row gap-4 mb-4">
        <div className="flex-2 bg-white p-4 shadow-md w-full md:w-2/3 rounded-lg">
          <p className="flex-1 text-sm mb-4">
            Fill out the form below to edit an existing article.
          </p>
          <p className="flex-1 text-sm mb-4">
            After submission, you can view and manage your articles in the
            articles list.
          </p>
          <ArticleForm
            type="EDIT_ARTICLE"
            {...{
              ...plainArticle,
              slug: plainArticle?.slug ?? undefined,
              excerpt: plainArticle?.excerpt ?? undefined,
              featuredImageUrl: plainArticle?.featuredImageUrl,
              createdAt: new Date(plainArticle?.createdAt),
              updatedAt: plainArticle?.updatedAt
                ? new Date(plainArticle.updatedAt)
                : new Date(),
              tags: Array.isArray(plainArticle?.tags)
                ? (plainArticle.tags as string[])
                : undefined,
              content: plainArticle?.content
                ? (plainArticle.content as JSONContent[])
                : [],
              magazineEditionAlias:
                plainArticle?.magazineEditionAlias ?? undefined,
              magazineEditionNumber:
                plainArticle?.magazineEditionNumber ?? undefined,
            }}
            initialFeaturedImage={featuredImageData}
          />
        </div>
        <div className="flex-1"></div>
      </div>
    </main>
  );
};

export default page;
