"use server";

import Link from "next/link";
import React from "react";
import { authClient } from "@/lib/auth-client";
import { headers } from "next/headers";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { getInitials } from "@/lib/utils";
import { Button } from "./ui/button";
import { IconSettings, IconUser } from "@tabler/icons-react";
import { db } from "@/database/drizzle";
import { eq, is } from "drizzle-orm";
import { user as userTable } from "@/database/schema";

const UserProfileDropdown = async () => {
  const session = await authClient.getSession({
    fetchOptions: {
      headers: await headers(),
    },
  });

  if (!session) {
    return null;
  }

  const sessionUser = session?.data?.user;

  let isAdmin = false;
  if (sessionUser) {
    isAdmin = await db
      .select({ isAdmin: userTable.role })
      .from(userTable)
      .where(eq(userTable.id, sessionUser.id))
      .limit(1)
      .then((res) => res[0]?.isAdmin === "admin");
  }

  return (
    <div className="h-8 ">
      {/* Account Dropdown */}
      {sessionUser ? (
        <div className=" hs-dropdown inline-flex [--strategy:absolute] [--auto-close:inside] [--placement:bottom-right] relative text-start">
          <button
            id="hs-dnad"
            type="button"
            className="cursor-pointer p-0.5 inline-flex shrink-0 items-center gap-x-3 text-start rounded-full hover:bg-gray-200 focus:outline-hidden focus:bg-gray-200"
            aria-haspopup="menu"
            aria-expanded="false"
            aria-label="Dropdown"
          >
            <Avatar>
              {/* <AvatarImage src="/images/favicon.png" /> */}
              <AvatarFallback className="bg-[#fffeb2] border border-gray-300">
                {getInitials(sessionUser?.name || "IN")}
              </AvatarFallback>
            </Avatar>
          </button>

          {/* Account Dropdown */}
          <div
            className="hs-dropdown-menu hs-dropdown-open:opacity-100 w-60 transition-[opacity,margin] duration opacity-0 hidden z-20 bg-white border border-gray-200 rounded-xl shadow-xl"
            role="menu"
            aria-orientation="vertical"
            aria-labelledby="hs-dnad"
          >
            <div className="py-2 px-3.5">
              <span className="font-medium text-gray-800">
                {sessionUser?.name}
              </span>
              <p className="text-sm text-gray-500">{sessionUser?.email}</p>
            </div>
            <div className="p-1 border-t border-gray-200">
              <Link
                className="flex items-center gap-x-3 py-2 px-3 rounded-lg text-sm text-gray-600 hover:bg-gray-100 disabled:opacity-50 disabled:pointer-events-none focus:outline-hidden focus:bg-gray-100"
                href={isAdmin ? "/admin" : "/contributor-profile"}
              >
                <IconUser className="h-4 w-4" />{" "}
                <span>{isAdmin ? "Admin Dashboard" : "Profile"}</span>
              </Link>
              <Link
                className="flex items-center gap-x-3 py-2 px-3 rounded-lg text-sm text-gray-600 hover:bg-gray-100 disabled:opacity-50 disabled:pointer-events-none focus:outline-hidden focus:bg-gray-100"
                href="#"
              >
                <IconSettings className="h-4 w-4" />{" "}
                <span>Account Management</span>
              </Link>
            </div>
          </div>
          {/* End Account Dropdown */}
        </div>
      ) : (
        <Link href="/sign-in">
          <Button className="bg-white text-stone-700 text-md font-bold hover:bg-slate-200  cursor-pointer">
            Sign In
            <span className="text-[#FF202B]">
              {" "}
              <IconUser className="h-4 w-4" />
            </span>
          </Button>
        </Link>
      )}
      {/* End Account Dropdown */}
    </div>
  );
};

export default UserProfileDropdown;
