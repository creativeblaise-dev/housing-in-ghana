"use server";
import { db } from "@/database/drizzle";
import { AuthCredentials } from "@/types";
import { eq } from "drizzle-orm";
import { users } from "@/database/schema";
import bcrypt from "bcryptjs";
import { signIn } from "@/auth";
import { headers } from "next/headers";
import ratelimit from "../ratelimit";
import { redirect } from "next/navigation";

export const signInWithCredentials = async (
  params: Pick<AuthCredentials, "email" | "password">
) => {
  const { email, password } = params;
  const ip = (await headers()).get("x-forwarded-for") || "";
  const { success } = await ratelimit.limit(ip);

  if (!success) redirect("/too-fast");
  try {
    const result = await signIn("credentials", {
      email,
      password,
      redirect: false,
    });
    if (result?.error) {
      return { success: false, error: result.error };
    }

    return { success: true };
  } catch (error) {
    throw new Error("Error signing in");
  }
};

export const signUp = async ({
  fullName,
  email,
  password,
}: AuthCredentials) => {
  const ip = (await headers()).get("x-forwarded-for") || "";
  const { success } = await ratelimit.limit(ip);

  if (!success) redirect("/too-fast");

  const existingUser = await db
    .select()
    .from(users)
    .where(eq(users.email, email))
    .limit(1);

  if (existingUser.length > 0) {
    return { success: false, error: "User already exists" };
  }

  // Create the new user
  const hashedPassword = await bcrypt.hash(password, 10);

  try {
    await db.insert(users).values({
      fullName,
      email,
      password: hashedPassword,
    });

    await signInWithCredentials({ email, password });

    return { success: true };
  } catch (error) {
    throw new Error("Error creating user");
  }
};
