"use server";

import { db } from "@/database/drizzle";
import { article } from "@/database/schema";
import { ArticleType } from "@/types";
import { eq } from "drizzle-orm";

export const createArticle = async (params: ArticleType) => {
  try {
    const {
      initialFeaturedImage, // remove properties not in schema
      magazineEditionAlias,
      ...restParams
    } = params;

    const newArticle = await db
      .insert(article)
      .values({
        ...restParams,
        status:
          params.status === "published" || params.status === "archived"
            ? params.status
            : "draft",
        magazineEditionAlias:
          magazineEditionAlias === null ? null : magazineEditionAlias, // ensure string or null
      })
      .returning();

    console.log("Article created successfully");

    return {
      success: true,
      data: JSON.parse(JSON.stringify(newArticle[0])),
    };
  } catch (error) {
    console.log(error);

    return {
      success: false,
      message: "An error occurred while creating article.",
    };
  }
};

export const updateArticle = async (slug: string, params: ArticleType) => {
  try {
    const updatedArticle = await db
      .update(article)
      .set({
        ...params,
        status:
          params.status === "published" || params.status === "archived"
            ? params.status
            : "draft",
        updatedAt: new Date(),
        content: params.content,
        magazineEditionAlias: params.magazineEditionAlias || null,
      })
      .where(eq(article.slug, slug));

    const plainUpdated = updatedArticle
      ? JSON.parse(JSON.stringify(updatedArticle))
      : null;
    return { success: true, data: plainUpdated };
  } catch (error) {
    return {
      success: false,
      message: "An error occurred while updating article.",
    };
  }
};

export const deleteArticle = async (id: string) => {
  try {
    await db.delete(article).where(eq(article.id, id));
    return { success: true };
  } catch (error) {
    return {
      success: false,
      message: "An error occurred while deleting article.",
    };
  }
};
