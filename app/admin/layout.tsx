import React from "react";
import { ReactNode } from "react";
import AdminHeader from "@/components/admin/AdminHeader";
import AdminMainContent from "@/components/admin/AdminMainContent";
import AdminSidebar from "@/components/admin/AdminSidebar";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import config from "@/lib/config";

const Layout = async ({ children }: { children: ReactNode }) => {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  console.log(session?.user?.email);

  if (!session) {
    redirect("/sign-in");
  }

  const isAdmin = await fetch(`${config.env.betterAuthURL}/api/user/${session.user.id}/role`)
    .then(res => res.json())
    .then(data => data.isAdmin)
    .catch(() => false);

  if (!isAdmin) {
    redirect("/");
  }

  return (
    <>
      <AdminHeader />
      <AdminSidebar />
      <AdminMainContent>{children}</AdminMainContent>
    </>
  );
};

export default Layout;
