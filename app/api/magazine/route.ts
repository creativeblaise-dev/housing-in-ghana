import { NextResponse } from "next/server";
import { db } from "@/database/drizzle";
import { magazineEditions } from "@/database/schema";

export async function GET() {
  try {
    const editions = await db.select().from(magazineEditions);
    return NextResponse.json(editions);
  } catch {
    return NextResponse.json(
      { error: "Failed to fetch magazine editions" },
      { status: 500 }
    );
  }
}
