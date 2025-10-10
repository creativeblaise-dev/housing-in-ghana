import { auth } from "@/lib/auth"; // Your Better Auth instance
import { NextRequest, NextResponse } from "next/server";
import { headers } from "next/headers";
import { cache } from "react";
import { db } from "@/database/drizzle";
import { user } from "@/database/schema";
import { eq } from "drizzle-orm";

export const getServerSession = cache(async () => {
  return await auth.api.getSession({ headers: await headers() });
});

export async function requireAuth(request: NextRequest) {
  const session = await getServerSession();

  if (!session) {
    return NextResponse.json(
      { error: "Authentication required" },
      { status: 401 }
    );
  }

  return session;
}

export const requireAdmin = async (request: NextRequest) => {
  try {
    const session = await getServerSession();

    // Check if session exists
    if (!session) {
      return NextResponse.json(
        {
          error: "Authentication required",
          message: "No active session found. Please log in.",
        },
        { status: 401 }
      );
    }

    // Check if user ID exists in session
    if (!session.user?.id) {
      return NextResponse.json(
        {
          error: "Invalid session",
          message: "Session does not contain valid user information.",
        },
        { status: 401 }
      );
    }

    // Fetch user role from database
    const [userRecord] = await db
      .select({
        id: user.id,
        role: user.role,
        email: user.email,
      })
      .from(user)
      .where(eq(user.id, session.user.id))
      .limit(1);

    // Check if user exists in database
    if (!userRecord) {
      return NextResponse.json(
        {
          error: "User not found",
          message: "User account not found in database.",
        },
        { status: 404 }
      );
    }

    // Check if user has admin privileges
    if (userRecord.role !== "admin" && userRecord.role !== "super_admin") {
      return NextResponse.json(
        {
          error: "Insufficient permissions",
          message: `Access denied. Required role: admin or super_admin. Current role: ${userRecord.role || "none"}`,
        },
        { status: 403 }
      );
    }

    // Return session with user role information
    return {
      ...session,
      user: {
        ...session.user,
        role: userRecord.role,
        dbId: userRecord.id,
      },
    };
  } catch (error) {
    return NextResponse.json(
      {
        error: "Authentication error",
        message: "Failed to verify user permissions.",
        details: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 }
    );
  }
};
