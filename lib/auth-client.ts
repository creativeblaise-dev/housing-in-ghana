import { createAuthClient } from "better-auth/react";

export const authClient = createAuthClient({
  baseURL: process.env.NEXT_PUBLIC_PROD_API_ENDPOINT,
});

export type Session = typeof authClient.$Infer.Session.user;

export const { useSession, signIn, signOut, signUp } = authClient;
