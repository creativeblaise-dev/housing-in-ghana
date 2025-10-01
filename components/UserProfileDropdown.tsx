"use client";

import Link from "next/link";
import React, { useEffect, useState, useRef } from "react";
import { Avatar, AvatarFallback } from "./ui/avatar";
import { getInitials } from "@/lib/utils";
import { Button } from "./ui/button";
import {
  IconUser,
  IconSettings,
  IconLogout,
  IconShield,
} from "@tabler/icons-react";
import { authClient } from "@/lib/auth-client";

type User = {
  id: string;
  name: string;
  email: string;
};

const UserProfileDropdown = () => {
  const [user, setUser] = useState<User | null>(null);
  const [isAdmin, setIsAdmin] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const fetchSession = async () => {
      try {
        const newSession = await authClient.getSession();

        if (!newSession) {
          setIsLoading(false);
          return;
        }

        setUser(newSession?.data?.user || null);

        const roleResponse = await fetch(
          `/api/user/${newSession?.data?.user?.id}/role`
        );

        if (roleResponse.ok) {
          const roleData = await roleResponse.json();
          setIsAdmin(roleData.isAdmin);
        }
      } catch (error) {
        console.log(error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchSession();
  }, []);

  // Handle dropdown toggle
  const handleDropdownToggle = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDropdownOpen(!isDropdownOpen);
  };

  // Handle sign out
  const handleSignOut = async () => {
    try {
      await authClient.signOut();
      setUser(null);
      setIsDropdownOpen(false);
      window.location.href = "/";
    } catch (error) {
      console.error("Sign out error:", error);
    }
  };

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsDropdownOpen(false);
      }
    };

    if (isDropdownOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isDropdownOpen]);

  // Close dropdown on escape key
  useEffect(() => {
    const handleEscapeKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setIsDropdownOpen(false);
      }
    };

    if (isDropdownOpen) {
      document.addEventListener("keydown", handleEscapeKey);
    }

    return () => {
      document.removeEventListener("keydown", handleEscapeKey);
    };
  }, [isDropdownOpen]);

  if (isLoading) {
    return (
      <div className="h-8 w-8 animate-pulse bg-gray-200 rounded-full"></div>
    );
  }

  return (
    <div className="h-8 relative">
      {user ? (
        <div ref={dropdownRef} className="relative inline-flex text-start">
          <button
            type="button"
            className="cursor-pointer p-0.5 inline-flex shrink-0 items-center gap-x-3 text-start rounded-full hover:bg-gray-200 focus:outline-none focus:bg-gray-200 transition-all duration-200 transform hover:scale-105"
            aria-haspopup="menu"
            aria-expanded={isDropdownOpen}
            aria-label="User Profile Dropdown"
            onClick={handleDropdownToggle}
          >
            <Avatar className="ring-2 ring-transparent hover:ring-[#FF202B]/20 transition-all duration-200">
              <AvatarFallback className="bg-gradient-to-br from-[#fffeb2] to-[#fff890] border border-gray-300 text-gray-700 font-semibold">
                {getInitials(user.name || "IN")}
              </AvatarFallback>
            </Avatar>
          </button>

          {/* Enhanced Dropdown Menu */}
          {isDropdownOpen && (
            <>
              {/* Backdrop for mobile */}
              <div
                className="fixed inset-0 z-40 lg:hidden"
                onClick={() => setIsDropdownOpen(false)}
              />

              <div
                className={`
                  absolute top-full right-0 mt-2 w-72 z-50 bg-white border border-gray-200 rounded-2xl shadow-2xl
                  transform transition-all duration-200 origin-top-right
                  ${
                    isDropdownOpen
                      ? "opacity-100 scale-100 translate-y-0"
                      : "opacity-0 scale-95 -translate-y-2"
                  }
                `}
                role="menu"
                aria-orientation="vertical"
                aria-labelledby="user-profile-button"
              >
                {/* User Info Header */}
                <div className="py-4 px-4 border-b border-gray-100 bg-gradient-to-r from-gray-50 to-gray-100 rounded-t-2xl">
                  <div className="flex items-center gap-3">
                    <Avatar className="h-12 w-12 ring-2 ring-white shadow-md">
                      <AvatarFallback className="bg-gradient-to-br from-[#FF202B] to-[#ff4757] text-white text-lg font-bold">
                        {getInitials(user.name || "IN")}
                      </AvatarFallback>
                    </Avatar>
                    <div className="flex-1 min-w-0">
                      <p className="font-semibold text-gray-900 truncate text-base">
                        {user.name}
                      </p>
                      <p className="text-sm text-gray-500 truncate">
                        {user.email}
                      </p>
                      {isAdmin && (
                        <div className="flex items-center gap-1 mt-1">
                          <IconShield className="h-3 w-3 text-[#FF202B]" />
                          <span className="text-xs text-[#FF202B] font-medium">
                            Admin
                          </span>
                        </div>
                      )}
                    </div>
                  </div>
                </div>

                {/* Menu Items */}
                <div className="p-2">
                  <Link
                    className="flex items-center gap-3 py-3 px-3 rounded-xl text-sm text-gray-700 hover:bg-gray-50 hover:text-[#FF202B] focus:outline-none focus:bg-gray-50 transition-all duration-200 w-full group"
                    href={isAdmin ? "/admin" : "/contributor-profile"}
                    onClick={() => setIsDropdownOpen(false)}
                  >
                    <div className="p-2 bg-gray-100 rounded-lg group-hover:bg-[#FF202B]/10 transition-colors duration-200">
                      {isAdmin ? (
                        <IconShield className="h-4 w-4 group-hover:text-[#FF202B] transition-colors duration-200" />
                      ) : (
                        <IconUser className="h-4 w-4 group-hover:text-[#FF202B] transition-colors duration-200" />
                      )}
                    </div>
                    <div className="flex-1">
                      <p className="font-medium">
                        {isAdmin ? "Admin Dashboard" : "Profile"}
                      </p>
                      <p className="text-xs text-gray-500">
                        {isAdmin ? "Manage your site" : "View and edit profile"}
                      </p>
                    </div>
                  </Link>

                  <Link
                    className="flex items-center gap-3 py-3 px-3 rounded-xl text-sm text-gray-700 hover:bg-gray-50 hover:text-[#FF202B] focus:outline-none focus:bg-gray-50 transition-all duration-200 w-full group"
                    href="/settings"
                    onClick={() => setIsDropdownOpen(false)}
                  >
                    <div className="p-2 bg-gray-100 rounded-lg group-hover:bg-[#FF202B]/10 transition-colors duration-200">
                      <IconSettings className="h-4 w-4 group-hover:text-[#FF202B] transition-colors duration-200" />
                    </div>
                    <div className="flex-1">
                      <p className="font-medium">Settings</p>
                      <p className="text-xs text-gray-500">
                        Account preferences
                      </p>
                    </div>
                  </Link>

                  {/* Divider */}
                  <div className="my-2 border-t border-gray-100"></div>

                  {/* Sign Out */}
                  <button
                    onClick={handleSignOut}
                    className="flex items-center gap-3 py-3 px-3 rounded-xl text-sm text-red-600 hover:bg-red-50 focus:outline-none focus:bg-red-50 transition-all duration-200 w-full group"
                  >
                    <div className="p-2 bg-red-100 rounded-lg group-hover:bg-red-200 transition-colors duration-200">
                      <IconLogout className="h-4 w-4" />
                    </div>
                    <div className="flex-1 text-left">
                      <p className="font-medium">Sign Out</p>
                      <p className="text-xs text-red-500">
                        Log out of your account
                      </p>
                    </div>
                  </button>
                </div>
              </div>
            </>
          )}
        </div>
      ) : (
        <Link href="/sign-in">
          <Button className="bg-transparent shadow-none hover:bg-gray-100 text-stone-700 text-sm font-bold cursor-pointer transition-all duration-200 transform hover:scale-105 border border-gray-200 hover:border-[#FF202B]/30">
            <span className="mr-2 hidden lg:inline">Sign In</span>
            <IconUser className="h-4 w-4 text-[#FF202B]" />
          </Button>
        </Link>
      )}
    </div>
  );
};

export default UserProfileDropdown;
