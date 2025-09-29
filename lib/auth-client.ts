import { createAuthClient } from "better-auth/react";

const getBaseURL = () => {
  // Check if we're in the browser
  if (typeof window !== "undefined") {
    // Use current origin in browser
    return window.location.origin;
  }

  // Server-side: use environment variable or fallback
  if (process.env.NODE_ENV === "production") {
    return (
      process.env.NEXT_PUBLIC_API_ENDPOINT ||
      process.env.NEXT_PUBLIC_PROD_API_ENDPOINT
    );
  }

  return "http://localhost:3000";
};

export const authClient = createAuthClient({
  baseURL: getBaseURL(),
});

export type Session = typeof authClient.$Infer.Session.user;

export const { useSession, signIn, signOut, signUp } = authClient;
