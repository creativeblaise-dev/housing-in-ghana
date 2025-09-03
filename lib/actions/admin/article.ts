"use server";

import { db } from "@/database/drizzle";
import { article } from "@/database/schema";
import { ArticleType } from "@/types";

export const createArticle = async (params: ArticleType) => {
  try {
    const newArticle = await db
      .insert(article)
      .values({
        ...params,
        status:
          params.status === "published" || params.status === "archived"
            ? params.status
            : "draft",
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
      message: "An errror occured while creating article.",
    };
  }
};
