import { NextRequest, NextResponse } from "next/server";
import { db } from "@/database/drizzle";
import { user as endUser } from "@/database/schema";
import { desc } from "drizzle-orm";
import { requireAdmin } from "@/lib/auth-protection";

export async function GET(request: NextRequest) {
  try {
    // Check authentication and authorization
    const sessionOrError = await requireAdmin(request);
    if (sessionOrError instanceof NextResponse) {
      return sessionOrError; // Return error if not authenticated/authorized
    }

    // If we reach here, user is authenticated and is an admin
    const users = await db
      .select({
        id: endUser.id,
        name: endUser.name,
        email: endUser.email,
        role: endUser.role,
        status: endUser.status,
        image: endUser.image,
        emailVerified: endUser.emailVerified,
        createdAt: endUser.createdAt,
        updatedAt: endUser.updatedAt,
      })
      .from(endUser)
      .orderBy(desc(endUser.createdAt));

    return NextResponse.json({
      success: true,
      data: users,
    });
  } catch (error) {
    return NextResponse.json(
      {
        success: false,
        error: "Failed to fetch users",
        details: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 }
    );
  }
}
