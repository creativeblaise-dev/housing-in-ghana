"use client";

import { useState } from "react";
import { Dialog, DialogPanel } from "@headlessui/react";
import { Bars3CenterLeftIcon, XMarkIcon } from "@heroicons/react/24/outline";
import Image from "next/image";
import Link from "next/link";
import { navigation } from "../constants/index";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { getInitials } from "@/lib/utils";
import UserProfileDropdown from "./UserProfileDropdown";
import { Session } from "next-auth";
import { Button } from "./ui/button";
import { IconUser } from "@tabler/icons-react";

const desktopMenuItemClasses: string =
  "text-gray-800  transition-colors py-2 md:py-2 font-bold letter-spacing tracking-wide text-md hover:text-[#FF202B] cursor-pointer";

const Header = ({ session }: { session: Session | null }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="bg-[#ffffff] shadow-md sticky top-0 z-50 ">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between py-4">
          <div className="flex items-center">
            <Image
              src="/images/housing-in-ghana-logo.png"
              alt="logo"
              width={130}
              height={60}
            />
          </div>

          {/* Desktop Nav */}
          <nav className="hidden lg:flex space-x-8">
            {navigation.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className={
                  item.name === "Advertise With Us"
                    ? desktopMenuItemClasses +
                      " bg-[#FF202B] text-white w-auto cursor-pointer border-1 rounded-lg md:px-4 hover:bg-[#232525] hover:text-white "
                    : desktopMenuItemClasses + " hover:text-[#FF202B]"
                }
              >
                {item.name}
              </Link>
            ))}
            {session ? (
              <UserProfileDropdown session={session}>
                <Avatar>
                  {/* <AvatarImage src="/images/favicon.png" /> */}
                  <AvatarFallback className="bg-[#fffeb2] border border-gray-300">
                    {getInitials(session?.user?.name || "IN")}
                  </AvatarFallback>
                </Avatar>
              </UserProfileDropdown>
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
          </nav>

          {/* Mobile Menu Button */}
          <div className="lg:hidden">
            <button
              onClick={() => setMobileMenuOpen(true)}
              className="text-gray-700 hover:text-[#FF202B]"
            >
              <Bars3CenterLeftIcon className="h-6 w-6" />
            </button>
          </div>
        </div>
      </div>
      <div className="bg-[url(/images/hig-line.png)] bg-cover h-1.5 bg-no-repeat  "></div>

      {/* Mobile Menu Dialog */}
      <Dialog
        as="div"
        className="lg:hidden"
        open={mobileMenuOpen}
        onClose={setMobileMenuOpen}
      >
        <div className="fixed inset-0 z-50 bg-black bg-opacity-25" />
        <DialogPanel className="fixed top-0 right-0 w-3/4 max-w-sm h-full bg-white shadow-lg z-50 p-6">
          <div className="flex items-center justify-between">
            <span className="text-xl font-bold text-[#FF202B]">
              <Image
                src="/images/housing-in-ghana-logo.png"
                alt="logo"
                width={130}
                height={60}
              />
            </span>
            <button
              onClick={() => setMobileMenuOpen(false)}
              className="text-gray-700 hover:text-red-600"
            >
              <XMarkIcon className="h-6 w-6" />
            </button>
          </div>

          <div className="mt-6 space-y-4">
            {navigation.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className="block text-gray-700 hover:text-[#FF202B] transition-colors text-lg"
              >
                {item.name}
              </Link>
            ))}
            {/* <UserProfileDropdown>
              <UserAvatar />
            </UserProfileDropdown> */}
          </div>
        </DialogPanel>
      </Dialog>
    </header>
  );
};

export default Header;
