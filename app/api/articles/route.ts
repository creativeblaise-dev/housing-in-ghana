import { NextResponse } from "next/server";
import { db } from "@/database/drizzle";
import { article } from "@/database/schema";
import { desc, eq } from "drizzle-orm";

export async function GET() {
  try {
    const articles = await db
      .select()
      .from(article)
      .where(eq(article.status, "published"))
      .orderBy(desc(article.createdAt));

    return NextResponse.json(articles);
  } catch {
    return NextResponse.json(
      { error: "Failed to fetch articles" },
      { status: 500 }
    );
  }
}
