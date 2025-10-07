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
                width={100}
                height={40}
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

          {/* Mobile Menu - User Profile + Hamburger */}
          <div className="lg:hidden flex items-center gap-3">
            {/* Show user profile in mobile */}
            <div className="flex items-center">{userprofile}</div>

            {/* Hamburger Menu Button */}
            <button
              onClick={() => setMobileMenuOpen(true)}
              className="text-gray-700 hover:text-[#FF202B] p-2 rounded-md transition-colors duration-200 hover:bg-gray-100"
              aria-label="Open mobile menu"
            >
              <Bars3CenterLeftIcon className="h-6 w-6" />
            </button>
          </div>
        </div>
      </div>

      {/* Enhanced Mobile Menu Dialog */}
      <Dialog
        as="div"
        className="lg:hidden"
        open={mobileMenuOpen}
        onClose={setMobileMenuOpen}
      >
        {/* Backdrop with animation */}
        <div
          className={`fixed inset-0 z-40 bg-black transition-opacity duration-300 ${
            mobileMenuOpen ? "bg-opacity-50" : "bg-opacity-0"
          }`}
          onClick={() => setMobileMenuOpen(false)}
        />

        {/* Slide-in Panel */}
        <DialogPanel
          className={`fixed top-0 right-0 w-80 max-w-[85vw] h-full bg-white shadow-2xl z-50 transform transition-transform duration-300 ease-in-out ${
            mobileMenuOpen ? "translate-x-0" : "translate-x-full"
          }`}
        >
          {/* Header */}
          <div className="flex items-center justify-between p-6 border-b border-gray-100">
            <OptimizedImage
              src="/images/housing-in-ghana-logo.png"
              alt="logo"
              width={120}
              height={55}
              className="w-auto h-auto"
            />
            <button
              onClick={() => setMobileMenuOpen(false)}
              className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-md transition-colors duration-200"
              aria-label="Close mobile menu"
            >
              <XMarkIcon className="h-6 w-6" />
            </button>
          </div>

          {/* Navigation Items */}
          <div className="flex-1 py-6 px-4 space-y-2">
            {navigation.map((item, index) => {
              const isActive =
                (item.href !== "/" &&
                  pathname.includes(item.href) &&
                  item.href.length > 1) ||
                pathname === item.href;

              return (
                <Link
                  key={item.name}
                  href={item.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className={`
                    group flex items-center px-4 py-3 text-base font-medium rounded-lg transition-all duration-200 transform hover:scale-[0.98]
                    ${
                      isActive
                        ? "bg-[#FF202B] text-white shadow-md"
                        : item.name === "Advertise With Us"
                          ? "bg-gradient-to-r from-[#FF202B] to-[#ff4757] text-white shadow-md hover:shadow-lg"
                          : "text-gray-700 hover:bg-gray-50 hover:text-[#FF202B]"
                    }
                  `}
                  style={{
                    animationDelay: `${index * 50}ms`,
                    animation: mobileMenuOpen
                      ? `slideInRight 0.3s ease-out forwards`
                      : "none",
                  }}
                >
                  <span className="flex-1">{item.name}</span>

                  {/* Active indicator */}
                  {isActive && (
                    <div className="w-2 h-2 bg-white rounded-full opacity-80" />
                  )}

                  {/* Hover arrow */}
                  <svg
                    className={`w-4 h-4 transition-transform duration-200 ${
                      isActive
                        ? "opacity-80"
                        : "opacity-0 group-hover:opacity-60 group-hover:translate-x-1"
                    }`}
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 5l7 7-7 7"
                    />
                  </svg>
                </Link>
              );
            })}
          </div>

          {/* Footer - User Profile Section */}
          <div className="border-t border-gray-100 p-4">
            <div className="flex items-center justify-center">
              {userprofile}
            </div>
          </div>
        </DialogPanel>
      </Dialog>

      {/* Add custom animations */}
      <style jsx>{`
        @keyframes slideInRight {
          from {
            opacity: 0;
            transform: translateX(20px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }
      `}</style>
    </header>
  );
};

export default Header;
