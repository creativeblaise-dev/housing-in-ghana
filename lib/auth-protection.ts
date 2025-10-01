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
  const session = await getServerSession();

  if (session instanceof NextResponse) {
    return session;
  }

  if (!session?.user?.id) {
    return NextResponse.json(
      { error: "Authentication required" },
      { status: 401 }
    );
  }

  try {
    // Fetch user role from database
    const [userRole] = await db
      .select({ role: user.role })
      .from(user)
      .where(eq(user.id, session.user.id))
      .limit(1);

    if (
      !userRole ||
      (userRole.role !== "admin" && userRole.role !== "super_admin")
    ) {
      return NextResponse.json(
        { error: "Admin access required" },
        { status: 403 }
      );
    }

    return { ...session, user: { ...session.user, role: userRole } };
  } catch (error) {
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
};
