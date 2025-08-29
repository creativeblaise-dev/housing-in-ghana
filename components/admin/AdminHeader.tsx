import React from "react";
import Image from "next/image";
import UserProfileDropdown from "../UserProfileDropdown";

const AdminHeader = () => {
  return (
    <header className="fixed top-0 inset-x-0 flex flex-wrap md:justify-start md:flex-nowrap z-48 lg:z-61 w-full bg-white text-sm py-2.5">
      <nav className="px-4 sm:px-5.5 flex basis-full items-center w-full mx-auto">
        <div className="w-full flex items-center gap-x-1.5">
          <ul className="flex items-center gap-1.5">
            <li className="inline-flex items-center relative text-gray-200 pe-1.5 last:pe-0 last:after:hidden after:absolute after:top-1/2 after:end-0 after:inline-block after:w-px after:h-3.5 after:bg-gray-300 after:rounded-full after:-translate-y-1/2 after:rotate-12">
              <a
                className="shrink-0 justify-center items-center  rounded-md text-xl inline-block font-semibold focus:outline-hidden focus:opacity-80"
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

              {/* Sidebar Toggle */}
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
              {/* End Sidebar Toggle */}
              <h2 className="w-full flex items-center gap-x-2 py-2 ps-2.5 pe-8 text-sm text-gray-800 truncate rounded-lg hover:bg-gray-100/70 focus:outline-hidden focus:bg-gray-100/70 dark:hover:bg-neutral-700/50 dark:focus:bg-neutral-700/50 dark:text-neutral-200">
                <span className="truncate font-bold text-xl lg:pl-15">
                  Hi, Rosa
                </span>
                <p className="text-md italic">Explore your dashboard!</p>
              </h2>
            </li>
          </ul>

          <ul className="flex flex-row items-center gap-x-3 ms-auto">
            <li className="hidden lg:inline-flex items-center gap-1.5 relative text-gray-500 pe-3 last:pe-0 last:after:hidden after:absolute after:top-1/2 after:end-0 after:inline-block after:w-px after:h-3.5 after:bg-gray-300 after:rounded-full after:-translate-y-1/2 after:rotate-12">
              <a
                className="flex items-center gap-x-1.5 py-1.5 px-2 text-sm text-gray-800 rounded-lg hover:bg-gray-200 focus:outline-hidden focus:bg-gray-200"
                href="#"
              >
                Docs
              </a>

              <a
                className="flex items-center gap-x-1.5 py-1.5 px-2 text-sm text-gray-800 rounded-lg hover:bg-gray-200 focus:outline-hidden focus:bg-gray-200"
                href="#"
              >
                API
              </a>
            </li>

            <li className="inline-flex items-center gap-1.5 relative text-gray-500 pe-3 last:pe-0 last:after:hidden after:absolute after:top-1/2 after:end-0 after:inline-block after:w-px after:h-3.5 after:bg-gray-300 after:rounded-full after:-translate-y-1/2 after:rotate-12">
              <button
                type="button"
                className="relative hidden lg:flex justify-center items-center gap-x-1.5 size-8 text-sm bg-gray-100 text-gray-500 rounded-full hover:bg-gray-200 hover:text-gray-800 focus:outline-hidden focus:bg-gray-200 focus:text-gray-800"
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
                  <path d="M12 7v14" />
                  <path d="M3 18a1 1 0 0 1-1-1V4a1 1 0 0 1 1-1h5a4 4 0 0 1 4 4 4 4 0 0 1 4-4h5a1 1 0 0 1 1 1v13a1 1 0 0 1-1 1h-6a3 3 0 0 0-3 3 3 3 0 0 0-3-3z" />
                </svg>
                <span className="sr-only">Knowledge Base</span>
              </button>
              <UserProfileDropdown />
            </li>
          </ul>
        </div>
      </nav>
    </header>
  );
};

export default AdminHeader;
