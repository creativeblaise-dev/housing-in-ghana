// app/api/admin/articles/route.ts
import { NextResponse } from "next/server";
import { db } from "@/database/drizzle";
import { desc } from "drizzle-orm";
import { article } from "@/database/schema";

export async function GET() {
  try {
    const articles = await db
      .select()
      .from(article)
      .orderBy(desc(article.createdAt));

    return NextResponse.json(articles || []);
  } catch (error) {
    console.error("Error fetching articles:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
