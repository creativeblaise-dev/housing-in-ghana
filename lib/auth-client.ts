import { createAuthClient } from "better-auth/react";

export const authClient = createAuthClient({
  baseURL: process.env.NEXT_PUBLIC_API_ENDPOINT || "http://localhost:3000",
});

export type Session = typeof authClient.$Infer.Session.user;

export const { useSession, signIn, signOut, signUp } = authClient;
