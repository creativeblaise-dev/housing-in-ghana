"use client";

import { ReactNode, useState } from "react";
import { Dialog, DialogPanel } from "@headlessui/react";
import { Bars3CenterLeftIcon, XMarkIcon } from "@heroicons/react/24/outline";

import Link from "next/link";
import { getImageUrl } from "@/lib/image-utils";
import { navigation } from "../constants/index";
import { usePathname } from "next/navigation";
import AnnouncementBanner from "./AnnouncementBanner";
import { OptimizedImage } from "./OptimizedImage";

const Header = ({ userprofile }: { userprofile: ReactNode }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const pathname = usePathname();

  const backgroundImageUrl = getImageUrl("/images/hig-line.png");

  return (
    <header className="bg-transparent backdrop-blur-md sticky top-0 z-50">
      <AnnouncementBanner />
      <div
        className="bg-cover h-1.5 bg-no-repeat"
        style={{ backgroundImage: `url(${backgroundImageUrl})` }}
      ></div>
      <div className="mx-4 max-w-7xl px-4 sm:px-6 lg:px-8 shadow-md bg-[#ffffff]/90 my-2 rounded-full">
        <div className="flex items-center justify-between py-2 mx-2">
          <div className="flex items-center">
            <Link href="/">
              <OptimizedImage
                src="/images/housing-in-ghana-logo.png"
                alt="logo"
                width={130}
                height={60}
                className="w-auto h-auto"
              />
            </Link>
          </div>

          {/* Desktop Nav */}
          <nav className="hidden lg:flex space-x-8 lg:items-center lg:justify-center lg:space-y-0">
            {navigation.map((item) => {
              const isActive =
                (item.href !== "/" &&
                  pathname.includes(item.href) &&
                  item.href.length > 1) ||
                pathname === item.href;

              const desktopMenuItemClasses: string =
                " transition-colors py-2 md:py-2 font-bold tracking-wide text-stone-700 text-sm hover:text-[#FF202B] cursor-pointer";

              const activeClasses = isActive ? " text-[#FF202B]" : "";
              return (
                <Link
                  key={item.name}
                  href={item.href}
                  className={
                    item.name === "Advertise With Us"
                      ? desktopMenuItemClasses +
                        " bg-[#FF202B] text-white w-auto cursor-pointer border-b-2 border-[#232525] rounded-full md:px-4 hover:bg-[#232525] hover:text-white "
                      : desktopMenuItemClasses + activeClasses
                  }
                >
                  {item.name}
                </Link>
              );
            })}
            {userprofile}
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
              <OptimizedImage
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
          </div>
        </DialogPanel>
      </Dialog>
    </header>
  );
};

export default Header;
