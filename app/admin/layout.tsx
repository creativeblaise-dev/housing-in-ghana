import React from "react";
import { ReactNode } from "react";
import AdminHeader from "@/components/admin/AdminHeader";
import AdminMainContent from "@/components/admin/AdminMainContent";
import AdminSidebar from "@/components/admin/AdminSidebar";

const Layout = async ({ children }: { children: ReactNode }) => {
  return (
    <>
      <AdminHeader />
      <AdminSidebar />
      <AdminMainContent>{children}</AdminMainContent>
    </>
  );
};

export default Layout;
