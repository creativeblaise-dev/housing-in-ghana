import React from "react";
import { ReactNode } from "react";
import AdminHeader from "@/components/admin/AdminHeader";
import AdminMainContent from "@/components/admin/AdminMainContent";
import AdminSidebar from "@/components/admin/AdminSidebar";
import { getServerSession } from "@/lib/auth-protection";
import { redirect } from "next/navigation";
import { db } from "@/database/drizzle";
import { user } from "@/database/schema";
import { eq } from "drizzle-orm";

const Layout = async ({ children }: { children: ReactNode }) => {
  const session = await getServerSession();

  console.log(session);

  if (!session) {
    redirect("/sign-in");
  }

  const isAdmin = await db
    .select({ isAdmin: user.role })
    .from(user)
    .where(eq(user.id, session.user.id))
    .limit(1)
    .then((res) => res[0]?.isAdmin === "admin");

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
