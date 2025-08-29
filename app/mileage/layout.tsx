import React, { ReactNode } from "react";
import Header from "@/components/Header";
import MainFooter from "@/components/MainFooter";

const Layout = async ({ children }: { children: ReactNode }) => {
  return (
    <>
      <main className="flex min-h-screen flex-1 flex-col  xs:px-1 ">
        <Header />
        <div>{children}</div>
        <MainFooter />
      </main>
    </>
  );
};

export default Layout;
