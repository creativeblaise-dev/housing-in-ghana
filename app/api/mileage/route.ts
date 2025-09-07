import { NextResponse } from "next/server";
import { db } from "@/database/drizzle";
import { mileagePosts } from "@/database/schema";

export async function GET() {
  try {
    const posts = await db.select().from(mileagePosts);
    return NextResponse.json(posts);
  } catch {
    return NextResponse.json(
      { error: "Failed to fetch mileage posts" },
      { status: 500 }
    );
  }
}
