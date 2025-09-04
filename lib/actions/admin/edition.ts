"use server";

import { db } from "@/database/drizzle";
import { magazineEditions } from "@/database/schema";
import { MagazineEdition } from "@/types";

export const createEdition = async (data: MagazineEdition) => {
  console.log("Creating edition with data:", data);
  try {
    const result = await db
      .insert(magazineEditions)
      .values({ ...data, releasedAt: data.releasedAt })
      .returning();
    return {
      success: true,
      data: JSON.parse(JSON.stringify(result[0])),
    };
  } catch (error) {
    console.error("Database error:", error);
    return { success: false, error: "Failed to create edition" };
  }
};
