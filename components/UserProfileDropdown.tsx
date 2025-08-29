"use server";

import Link from "next/link";
import React from "react";
import { authClient } from "@/lib/auth-client";
import { headers } from "next/headers";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { getInitials } from "@/lib/utils";
import { Button } from "./ui/button";
import { IconUser } from "@tabler/icons-react";

const UserProfileDropdown = async () => {
  const session = await authClient.getSession({
    fetchOptions: {
      headers: await headers(),
    },
  });

  const { user } = session?.data || {};

  return (
    <div className="h-8 ">
      {/* Account Dropdown */}
      {user ? (
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
                {getInitials(user?.name || "IN")}
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
              <span className="font-medium text-gray-800">{user?.name}</span>
              <p className="text-sm text-gray-500">{user?.email}</p>
            </div>
            <div className="p-1 border-t border-gray-200">
              <Link
                className="flex items-center gap-x-3 py-2 px-3 rounded-lg text-sm text-gray-600 hover:bg-gray-100 disabled:opacity-50 disabled:pointer-events-none focus:outline-hidden focus:bg-gray-100"
                href="/contributor-profile"
              >
                <svg
                  className="shrink-0 mt-0.5 size-4"
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2" />
                  <circle cx="12" cy="7" r="4" />
                </svg>
                Profile
              </Link>
              <Link
                className="flex items-center gap-x-3 py-2 px-3 rounded-lg text-sm text-gray-600 hover:bg-gray-100 disabled:opacity-50 disabled:pointer-events-none focus:outline-hidden focus:bg-gray-100"
                href="#"
              >
                <svg
                  className="shrink-0 size-4"
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M12.22 2h-.44a2 2 0 0 0-2 2v.18a2 2 0 0 1-1 1.73l-.43.25a2 2 0 0 1-2 0l-.15-.08a2 2 0 0 0-2.73.73l-.22.38a2 2 0 0 0 .73 2.73l.15.1a2 2 0 0 1 1 1.72v.51a2 2 0 0 1-1 1.74l-.15.09a2 2 0 0 0-.73 2.73l.22.38a2 2 0 0 0 2.73.73l.15-.08a2 2 0 0 1 2 0l.43.25a2 2 0 0 1 1 1.73V20a2 2 0 0 0 2 2h.44a2 2 0 0 0 2-2v-.18a2 2 0 0 1 1-1.73l.43-.25a2 2 0 0 1 2 0l.15.08a2 2 0 0 0 2.73-.73l.22-.39a2 2 0 0 0-.73-2.73l-.15-.08a2 2 0 0 1-1-1.74v-.5a2 2 0 0 1 1-1.74l.15-.09a2 2 0 0 0 .73-2.73l-.22-.38a2 2 0 0 0-2.73-.73l-.15.08a2 2 0 0 1-2 0l-.43-.25a2 2 0 0 1-1-1.73V4a2 2 0 0 0-2-2z" />
                  <circle cx="12" cy="12" r="3" />
                </svg>
                Settings
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
