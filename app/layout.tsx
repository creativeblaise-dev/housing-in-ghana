import type { Metadata } from "next";
import { ReactNode } from "react";
// import { Geist, Geist_Mono } from "next/font/google";
import localFont from "next/font/local";
import "./globals.css";
import { Toaster } from "sonner";

import PrelineScriptWrapper from "@/components/PrelineScriptWrapper";
import QueryProvider from "@/components/QueryProvider";
// const geistSans = Geist({
//   variable: "--font-geist-sans",
//   subsets: ["latin"],
// });

// const geistMono = Geist_Mono({
//   variable: "--font-geist-mono",
//   subsets: ["latin"],
// });

const questrialRegular = localFont({
  src: [{ path: "/fonts/Questrial-Regular.ttf" }],
});

export const metadata: Metadata = {
  title: "Housing In Ghana",
  description: "Real Estate Magazine",
};

const RootLayout = async ({ children }: { children: ReactNode }) => {
  return (
    <html lang="en">
      <body
        className={`${questrialRegular.className}  antialiased text-space tracking-normal `}
      >
        <QueryProvider>{children}</QueryProvider>
        <Toaster />
        {/* <MainFooter /> */}
        <PrelineScriptWrapper />
      </body>
    </html>
  );
};

export default RootLayout;
