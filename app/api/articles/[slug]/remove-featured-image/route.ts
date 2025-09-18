import { NextRequest, NextResponse } from "next/server";
import { db } from "@/database/drizzle";
import { article } from "@/database/schema";
import { eq } from "drizzle-orm";

export async function PATCH(
  req: NextRequest,
  { params }: { params: { slug: string } }
) {
  try {
    await db
      .update(article)
      .set({ featuredImageUrl: "" })
      .where(eq(article.slug, params.slug));
    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json(
      {
        success: false,
        error: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 }
    );
  }
}
