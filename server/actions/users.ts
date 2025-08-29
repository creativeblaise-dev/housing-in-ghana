"use server";
import { AuthCredentials } from "@/types";
import { auth } from "@/lib/auth";
import { eq } from "drizzle-orm";
import { db } from "@/database/drizzle";
import { user } from "@/database/schema";

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
    .select()
    .from(user)
    .where(eq(user.email, email))
    .limit(1);

  if (existingUser.length > 0) {
    return { success: false, error: "User already exists" };
  }

  try {
    await auth.api.signUpEmail({
      body: {
        name,
        email,
        password,
      },
    });

    return { success: true, message: "Sign up successful" };
  } catch (error) {
    const e = error as Error;
    return { success: false, error: e.message || "Sign up failed" };
  }
};
