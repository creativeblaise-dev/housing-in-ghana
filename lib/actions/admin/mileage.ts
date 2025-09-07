"use server";

import { db } from "@/database/drizzle";
import { mileagePosts } from "@/database/schema";
import { MileageFormData } from "@/types";

export const createMileagePost = async (data: MileageFormData) => {
  console.log("Creating mileage post with data:", data);
  try {
    const result = await db
      .insert(mileagePosts)
      .values({ ...data })
      .returning();
    return {
      success: true,
      data: JSON.parse(JSON.stringify(result[0])),
    };
  } catch (error) {
    console.error("Database error:", error);
    return { success: false, error: "Failed to create mileage post" };
  }
};
