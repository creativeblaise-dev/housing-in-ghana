"use server";

import { db } from "@/database/drizzle";
import { article } from "@/database/schema";
import { ArticleType } from "@/types";

export const createArticle = async (params: ArticleType) => {
  try {
    const {
      initialFeaturedImage, // remove properties not in schema
      magazineEditionNumber,
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
        magazineEditionNumber:
          magazineEditionNumber === null ? null : magazineEditionNumber, // ensure string or null
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
