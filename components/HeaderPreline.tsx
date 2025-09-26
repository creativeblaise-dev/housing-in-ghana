"use client";

import { ReactNode, useState } from "react";
import { Dialog, DialogPanel } from "@headlessui/react";
import { Bars3CenterLeftIcon, XMarkIcon } from "@heroicons/react/24/outline";
import Image from "next/image";
import Link from "next/link";
import { navigation } from "../constants/index";
import { usePathname } from "next/navigation";

const Header = ({ userprofile }: { userprofile: ReactNode }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const pathname = usePathname();

  return (
    <>
      {/* Sticky Glass Header */}
      <header className="sticky pt-1 top-4 inset-x-0 flex flex-wrap md:justify-start md:flex-nowrap z-50 w-full before:absolute before:inset-0 before:max-w-6xl before:mx-2 lg:before:mx-auto before:rounded-full before:bg-[#ffffff]/90 before:backdrop-blur-md before:shadow-lg">
        <div className="relative max-w-6xl w-full mx-2 lg:mx-auto">
          {/* Navigation container - no overflow hidden to allow dropdown */}
          <div className="rounded-full pb-2 relative overflow-hidden">
            <nav className="flex flex-wrap md:flex-nowrap basis-full items-center justify-between py-2 ps-5 pe-2 md:py-3">
              {/* Logo */}
              <div className="flex items-center">
                <Link href="/">
                  <Image
                    src="/images/housing-in-ghana-logo.png"
                    alt="logo"
                    width={120}
                    height={60}
                    className="w-auto h-auto"
                  />
                </Link>
              </div>

              {/* Desktop Navigation */}
              <div className="hidden md:block md:order-2">
                <div className="flex flex-row items-center justify-end gap-y-3 py-2 md:py-0 md:ps-7">
                  {navigation.map((item) => {
                    const isActive =
                      (item.href !== "/" &&
                        pathname.includes(item.href) &&
                        item.href.length > 1) ||
                      pathname === item.href;

                    // Special styling for "Advertise With Us" button
                    if (item.name === "Advertise With Us") {
                      return (
                        <Link
                          key={item.name}
                          href={item.href}
                          className="ms-3 inline-flex items-center gap-x-2 py-2 px-4 bg-[#FF202B] font-medium text-sm text-white rounded-full hover:bg-[#232525] focus:outline-none focus:ring-2 focus:ring-[#FF202B] focus:ring-offset-2 transition-all duration-200"
                        >
                          {item.name}
                        </Link>
                      );
                    }

                    return (
                      <Link
                        key={item.name}
                        href={item.href}
                        className={`pe-3 ps-px sm:px-3 md:py-4 text-sm font-bold hover:text-[#FF202B] focus:outline-none focus:text-[#FF202B] transition-colors duration-200 ${
                          isActive ? "text-[#FF202B]" : "text-gray-800"
                        }`}
                      >
                        {item.name}
                      </Link>
                    );
                  })}
                </div>
              </div>

              {/* Button Group - User Profile & Mobile Menu */}
              <div className="md:order-3 flex items-center gap-x-3 relative z-[60]">
                {/* User Profile - Desktop */}
                <div className="hidden md:block">{userprofile}</div>

                {/* Mobile Menu Button */}
                <div className="md:hidden">
                  <button
                    type="button"
                    onClick={() => setMobileMenuOpen(true)}
                    className="size-9 flex justify-center items-center text-sm font-semibold rounded-full bg-neutral-800 text-white hover:bg-neutral-700 transition-colors"
                    aria-label="Toggle navigation"
                  >
                    <Bars3CenterLeftIcon className="size-4" />
                  </button>
                </div>
              </div>
            </nav>

            {/* Decorative Border - positioned at bottom with proper margins */}
            <div
              className="absolute bottom-0 left-2 right-2 h-1.5 rounded-b-full"
              style={{
                backgroundImage: "url('/images/hig-line.png')",
                backgroundSize: "cover",
                backgroundRepeat: "no-repeat",
                backgroundPosition: "center",
              }}
            />
          </div>
        </div>
      </header>

      {/* Mobile Menu Dialog */}
      <Dialog
        as="div"
        className="lg:hidden"
        open={mobileMenuOpen}
        onClose={setMobileMenuOpen}
      >
        <div className="fixed inset-0 z-50 bg-black bg-opacity-25" />
        <DialogPanel className="fixed top-0 right-0 w-3/4 max-w-sm h-full bg-white/95 backdrop-blur-md shadow-2xl z-50 p-6 rounded-l-2xl">
          <div className="flex items-center justify-between">
            <Image
              src="/images/housing-in-ghana-logo.png"
              alt="logo"
              width={100}
              height={46}
              className="w-auto h-auto"
            />
            <button
              onClick={() => setMobileMenuOpen(false)}
              className="size-8 flex justify-center items-center text-gray-700 hover:text-[#FF202B] hover:bg-gray-100 rounded-full transition-all duration-200"
            >
              <XMarkIcon className="h-5 w-5" />
            </button>
          </div>

          {/* Mobile Navigation Links */}
          <div className="mt-8 space-y-1">
            {navigation.map((item) => {
              const isActive =
                (item.href !== "/" &&
                  pathname.includes(item.href) &&
                  item.href.length > 1) ||
                pathname === item.href;

              // Special styling for "Advertise With Us" button in mobile
              if (item.name === "Advertise With Us") {
                return (
                  <Link
                    key={item.name}
                    href={item.href}
                    onClick={() => setMobileMenuOpen(false)}
                    className="block w-full text-center py-3 px-4 bg-[#FF202B] text-white font-bold rounded-full hover:bg-[#232525] transition-colors duration-200 mt-4"
                  >
                    {item.name}
                  </Link>
                );
              }

              return (
                <Link
                  key={item.name}
                  href={item.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className={`block py-3 px-4 font-bold rounded-lg transition-all duration-200 ${
                    isActive
                      ? "text-[#FF202B] bg-red-50"
                      : "text-gray-700 hover:text-[#FF202B] hover:bg-gray-50"
                  }`}
                >
                  {item.name}
                </Link>
              );
            })}
          </div>

          {/* Mobile User Profile */}
          <div className="mt-8 pt-6 border-t border-gray-200">
            {userprofile}
          </div>
        </DialogPanel>
      </Dialog>
    </>
  );
};

export default Header;
