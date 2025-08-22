import React from "react";
import { ReactNode } from "react";
import Header from "@/components/Header";
import MainFooter from "@/components/MainFooter";
import { auth } from "@/auth";

const Layout = async ({ children }: { children: ReactNode }) => {
  const session = await auth();

  return (
    <>
      <main className="flex min-h-screen flex-1 flex-col  xs:px-1 ">
        <Header session={session} />
        <div>{children}</div>
        <MainFooter />
      </main>
    </>
  );
};

export default Layout;
