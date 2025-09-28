import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "@/lib/auth-protection";

export async function GET(request: NextRequest) {
  try {
    const session = await getServerSession();

    if (!session) {
      return NextResponse.json({ user: null });
    }

    return NextResponse.json({
      user: {
        id: session.user.id,
        name: session.user.name,
        email: session.user.email,
      },
    });
  } catch (error) {
    console.error("Error fetching session:", error);
    return NextResponse.json({ user: null });
  }
}
