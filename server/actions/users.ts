"use server";
import { AuthCredentials } from "@/types";
import { auth } from "@/lib/auth";
import { eq } from "drizzle-orm";
import { db } from "@/database/drizzle";
import { user } from "@/database/schema";
import { UserRoles, UserStatus } from "@/types";

export const signIn = async (
  params: Pick<AuthCredentials, "email" | "password">
) => {
  try {
    const { email, password } = params;
    await auth.api.signInEmail({
      body: {
        email,
        password,
      },
    });

    return { success: true, message: "Sign in successful" };
  } catch (error) {
    const e = error as Error;
    return { success: false, message: e.message || "Sign in failed" };
  }
};

export const signUpUser = async ({
  name,
  email,
  password,
}: AuthCredentials) => {
  const existingUser = await db
    .select({
      id: user.id,
      email: user.email,
      name: user.name,
    })
    .from(user)
    .where(eq(user.email, email))
    .limit(1);

  if (existingUser.length > 0) {
    return { success: false, error: "User already exists" };
  }

  try {
    const newUser = await auth.api.signUpEmail({
      body: {
        name,
        email,
        password,
      },
    });

    return {
      success: true,
      message: "Sign up successful",
      userId: newUser.user.id,
    };
  } catch (error) {
    const e = error as Error;
    return { success: false, error: e.message || "Sign up failed" };
  }
};

// server/actions/user.ts
export async function updateUserRole(userId: string, role: UserRoles["role"]) {
  // Implementation

  await db.update(user).set({ role }).where(eq(user.id, userId)).execute();

  return { success: true };
}

export async function toggleUserStatus(
  userId: string,
  status: UserStatus["status"]
) {
  // Implementation

  await db.update(user).set({ status }).where(eq(user.id, userId)).execute();

  return { success: true };
}

export async function deleteUser(userId: string) {
  // Implementation

  await db.delete(user).where(eq(user.id, userId)).execute();

  return { success: true };
}
