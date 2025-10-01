import { betterAuth } from "better-auth";
import { drizzleAdapter } from "better-auth/adapters/drizzle";
import { db } from "../database/drizzle";
import * as schema from "../database/schema";
import config from "@/lib/config";
import { nextCookies } from "better-auth/next-js";
import EmailVerification from "@/mail/template/verification-email-template";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export const auth = betterAuth({
  appName: "Housing In Ghana",
  trustedOrigins: [config.env.betterAuthURL],
  database: drizzleAdapter(db, {
    provider: "pg",
    schema,
  }),
  emailVerification: {
    sendVerificationEmail: async ({ url, user }) => {
      await resend.emails.send({
        from: "Housing In Ghana <onboarding@housinginghana.com>",
        to: user.email,
        subject: "Verify Email",
        react: EmailVerification({
          userEmail: user.email,
          verificationUrl: url,
        }),
      });
    },
    sendOnSignUp: true,
  },
  emailAndPassword: {
    enabled: true,
    autoSignIn: false,
    minPasswordLength: 8,
    maxPasswordLength: 128,
    requireEmailVerification: true,
  },
  advanced: {
    cookiePrefix: "housing-in-ghana",
  },
  plugins: [nextCookies()],
});
