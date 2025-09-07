import React from "react";
import Link from "next/link";
import {
  IconBus,
  IconFile,
  IconHome2,
  IconLogout,
  IconNews,
  IconPhoto,
} from "@tabler/icons-react";
import { AdminSidebarMenuTypes } from "@/types";
import { Button } from "@react-email/components";
import SignOutButton from "../SignOutButton";
import UserProfileDropdown from "../UserProfileDropdown";

const adminSidebarMenu: AdminSidebarMenuTypes[] = [
  {
    group: "Home",
    items: [
      {
        name: "Dashboard",
        href: "/admin",
        icon: <IconHome2 className="h-4 w-4" />,
      },
    ],
  },
  {
    group: "Content Management",
    items: [
      {
        name: "Articles",
        href: "/admin/articles",
        icon: <IconFile className="h-4 w-4" />,
      },
      {
        name: "Magazine Editions",
        href: "/admin/magazine",
        icon: <IconNews className="h-4 w-4" />,
      },
      {
        name: "Mileage Gallery Hub",
        href: "/admin/mileage",
        icon: <IconBus className="h-4 w-4 " />,
      },
    ],
  },
  {
    group: "Advertising",
    items: [
      {
        name: "Advertisers List",
        href: "/admin/advertisers-list",
        icon: <IconHome2 className="h-4 w-4" />,
      },
      {
        name: "Draft",
        href: "/admin/draft",
        icon: <IconHome2 className="h-4 w-4" />,
      },
      {
        name: "Published",
        href: "/admin/published",
        icon: <IconHome2 className="h-4 w-4" />,
      },
    ],
  },
];

const AdminSidebar = () => {
  return (
    <div
      id="hs-pro-sidebar"
      className="hs-overlay [--body-scroll:true] lg:[--overlay-backdrop:false] [--is-layout-affect:true] [--opened:lg] [--auto-close:lg]
hs-overlay-open:translate-x-0 lg:hs-overlay-layout-open:translate-x-0
-translate-x-full transition-all duration-300 transform
w-60
bg-gray-900
hidden
fixed inset-y-0 z-60 start-0

lg:block lg:-translate-x-full lg:end-auto lg:bottom-0
dark:bg-neutral-900"
      role="dialog"
      tabIndex={-1}
      aria-label="Sidebar"
    >
      <div className="lg:pt-13 relative flex flex-col h-full max-h-full">
        <nav className="p-3 mt-2 size-full flex flex-col overflow-y-auto [&::-webkit-scrollbar]:w-2 [&::-webkit-scrollbar-thumb]:rounded-full [&::-webkit-scrollbar-track]:bg-gray-200 [&::-webkit-scrollbar-thumb]:bg-gray-300 dark:[&::-webkit-scrollbar-track]:bg-neutral-700 dark:[&::-webkit-scrollbar-thumb]:bg-neutral-500">
          {adminSidebarMenu.map((menu, index) => {
            const { group, items } = menu;
            return (
              <div
                key={index}
                className="pt-3 mt-3 flex flex-col border-t border-gray-600 first:border-t-0 first:pt-0 first:mt-0 dark:border-neutral-700"
              >
                <span className="block ps-2.5 mb-2 font-medium text-xs uppercase text-gray-500 dark:text-neutral-500">
                  {group}
                </span>

                <ul className="flex flex-col gap-y-1">
                  {items.map((item) => (
                    <li key={item.name}>
                      <Link
                        className="w-full flex items-center gap-x-2 py-2 px-2.5 text-sm text-zinc-200 rounded-lg hover:bg-gray-200 hover:text-slate-700 focus:outline-hidden focus:bg-gray-200 focus:text-slate-700 dark:hover:bg-neutral-800 dark:focus:bg-neutral-800 dark:text-neutral-200 "
                        href={item.href}
                      >
                        {item.icon}
                        {item.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            );
          })}
        </nav>

        <footer className="mt-auto p-3 flex flex-col">
          <ul className="flex flex-col gap-y-1">
            <li>
              <a
                className="w-full flex items-center gap-x-2 py-2 px-2.5 text-sm text-zinc-200 rounded-lg hover:text-stone-700 hover:bg-gray-200 focus:outline-hidden focus:bg-gray-200 dark:hover:bg-neutral-800 dark:focus:bg-neutral-800 dark:text-neutral-200"
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
                  <path d="M8.5 14.5A2.5 2.5 0 0 0 11 12c0-1.38-.5-2-1-3-1.072-2.143-.224-4.054 2-6 .5 2.5 2 4.9 4 6.5 2 1.6 3 3.5 3 5.5a7 7 0 1 1-14 0c0-1.153.433-2.294 1-3a2.5 2.5 0 0 0 2.5 2.5z" />
                </svg>
                Help & support
              </a>
            </li>
            <li>
              <SignOutButton
                buttonStyles="cursor-pointer"
                title="Sign Out"
                icon={<IconLogout className=" " />}
              />
            </li>
          </ul>
        </footer>
      </div>
    </div>
  );
};

export default AdminSidebar;
