"use client";

import React from "react";
import Image from "next/image";
import UserProfileDropdown from "../UserProfileDropdown";
import { usePreline } from "@/hooks/use-preline";

const AdminHeader = () => {
  // Initialize Preline components
  usePreline();

  return (
    <header className="fixed top-0 inset-x-0 flex flex-wrap md:justify-start md:flex-nowrap z-48 lg:z-61 w-full bg-white text-sm py-2.5">
      <nav className="px-4 sm:px-5.5 flex basis-full items-center w-full mx-auto">
        <div className="w-full flex items-center gap-x-1.5">
          <ul className="flex items-center gap-1.5">
            <li className="inline-flex items-center relative text-gray-200 pe-1.5 last:pe-0 last:after:hidden after:absolute after:top-1/2 after:end-0 after:inline-block after:w-px after:h-3.5 after:bg-gray-300 after:rounded-full after:-translate-y-1/2 after:rotate-12">
              <a
                className="shrink-0 justify-center items-center rounded-md text-xl inline-block font-semibold focus:outline-hidden focus:opacity-80"
                href="/"
                aria-label="Preline"
              >
                <Image
                  src="/images/housing-in-ghana-logo.png"
                  alt="logo"
                  width={130}
                  height={40}
                />
              </a>

              <div className="hidden sm:block ms-1"></div>

              <button
                type="button"
                className="p-1.5 size-7.5 inline-flex items-center gap-x-1 text-xs rounded-md border border-transparent text-gray-500 hover:text-gray-800 disabled:opacity-50 disabled:pointer-events-none focus:outline-hidden focus:text-gray-800"
                aria-haspopup="dialog"
                aria-expanded="false"
                aria-controls="hs-pro-sidebar"
                data-hs-overlay="#hs-pro-sidebar"
              >
                <svg
                  className="shrink-0 size-3.5"
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
                  <rect width="18" height="18" x="3" y="3" rx="2" />
                  <path d="M15 3v18" />
                  <path d="m10 15-3-3 3-3" />
                </svg>
                <span className="sr-only">Sidebar Toggle</span>
              </button>

              <h2 className="w-full flex items-center gap-x-2 py-2 ps-2.5 pe-8 text-sm text-gray-800 truncate rounded-lg hover:bg-gray-100/70 focus:outline-hidden focus:bg-gray-100/70 dark:hover:bg-neutral-700/50 dark:focus:bg-neutral-700/50 dark:text-neutral-200">
                <span className="truncate font-bold text-xl lg:pl-15">
                  Hi there, Admin!
                </span>
                <p className="text-md italic">Explore your dashboard!</p>
              </h2>
            </li>
          </ul>

          <ul className="flex flex-row items-center gap-x-3 ms-auto">
            <li className="inline-flex items-center gap-1.5 relative text-gray-500 pe-3 last:pe-0 last:after:hidden after:absolute after:top-1/2 after:end-0 after:inline-block after:w-px after:h-3.5 after:bg-gray-300 after:rounded-full after:-translate-y-1/2 after:rotate-12">
              <UserProfileDropdown />
            </li>
          </ul>
        </div>
      </nav>
    </header>
  );
};

export default AdminHeader;
