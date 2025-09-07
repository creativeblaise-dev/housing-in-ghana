import React, { ReactNode } from "react";
import Header from "@/components/Header";
import MainFooter from "@/components/MainFooter";
import UserProfileDropdown from "@/components/UserProfileDropdown";

const Layout = async ({ children }: { children: ReactNode }) => {
  return (
    <>
      <main className="flex min-h-screen flex-1 flex-col  xs:px-1 ">
        <Header userprofile={<UserProfileDropdown />} />
        <div>{children}</div>
        <MainFooter />
      </main>
    </>
  );
};

export default Layout;
