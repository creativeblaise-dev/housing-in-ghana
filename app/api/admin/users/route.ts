import { NextRequest, NextResponse } from "next/server";
import { db } from "@/database/drizzle";
import { user as endUser } from "@/database/schema";
import { desc } from "drizzle-orm";
import { requireAdmin } from "@/lib/auth-protection";

export async function GET(request: NextRequest) {
  // Check authentication
  const sessionOrError = await requireAdmin(request);
  if (sessionOrError instanceof NextResponse) {
    return sessionOrError; // Return error if not authenticated/authorized
  }

  try {
    const users = await db
      .select()
      .from(endUser)
      .orderBy(desc(endUser.createdAt));

    return NextResponse.json(users);
  } catch {
    return NextResponse.json(
      { error: "Failed to fetch articles" },
      { status: 500 }
    );
  }
}
