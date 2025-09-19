import { NextRequest, NextResponse } from "next/server";
import { db } from "@/database/drizzle";
import { user } from "@/database/schema";
import { eq } from "drizzle-orm";

export async function GET(
  request: NextRequest,
  context: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await context.params;

    const [userData] = await db
      .select({ role: user.role })
      .from(user)
      .where(eq(user.id, id))
      .limit(1);

    return NextResponse.json({
      isAdmin: userData?.role === "admin",
      role: userData?.role || "contributor",
    });
  } catch (error) {
    console.error("Error fetching user role:", error);
    return NextResponse.json(
      { error: "Failed to fetch user role" },
      { status: 500 }
    );
  }
}
