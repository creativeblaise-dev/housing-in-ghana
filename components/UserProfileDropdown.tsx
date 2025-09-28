"use client";

import Link from "next/link";
import React, { useEffect, useState, useRef } from "react";
import { Avatar, AvatarFallback } from "./ui/avatar";
import { getInitials } from "@/lib/utils";
import { Button } from "./ui/button";
import { IconUser } from "@tabler/icons-react";

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
    const fetchUserData = async () => {
      try {
        // Fetch user session
        const sessionResponse = await fetch("/api/auth/session");
        if (!sessionResponse.ok) {
          setIsLoading(false);
          return;
        }

        const sessionData = await sessionResponse.json();
        const userData = sessionData?.user;

        if (userData) {
          setUser(userData);

          // Fetch user role
          const roleResponse = await fetch(`/api/user/${userData.id}/role`);

          if (roleResponse.ok) {
            const roleData = await roleResponse.json();
            setIsAdmin(roleData.isAdmin);
          }
        }
      } catch (error) {
        console.error("Error fetching user data:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchUserData();
  }, []);

  // Handle dropdown toggle
  const handleDropdownToggle = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDropdownOpen(!isDropdownOpen);
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
    <div className="h-8">
      {user ? (
        <div ref={dropdownRef} className="relative inline-flex text-start">
          <button
            type="button"
            className="cursor-pointer p-0.5 inline-flex shrink-0 items-center gap-x-3 text-start rounded-full hover:bg-gray-200 focus:outline-none focus:bg-gray-200 transition-colors"
            aria-haspopup="menu"
            aria-expanded={isDropdownOpen}
            aria-label="User Profile Dropdown"
            onClick={handleDropdownToggle}
          >
            <Avatar>
              <AvatarFallback className="bg-[#fffeb2] border border-gray-300">
                {getInitials(user.name || "IN")}
              </AvatarFallback>
            </Avatar>
          </button>

          {/* Dropdown Menu */}
          {isDropdownOpen && (
            <div
              className="absolute top-full right-0 mt-2 w-60 z-50 bg-white border border-gray-200 rounded-xl shadow-xl animate-in fade-in-0 zoom-in-95 slide-in-from-top-2 duration-200"
              role="menu"
              aria-orientation="vertical"
              aria-labelledby="user-profile-button"
            >
              {/* User Info */}
              <div className="py-2 px-3.5 border-b border-gray-100">
                <span className="font-medium text-gray-800 block truncate">
                  {user.name}
                </span>
                <p className="text-sm text-gray-500 truncate">{user.email}</p>
              </div>

              {/* Menu Items */}
              <div className="p-1">
                <Link
                  className="flex items-center gap-x-3 py-2 px-3 rounded-lg text-sm text-gray-600 hover:bg-gray-100 focus:outline-none focus:bg-gray-100 transition-colors w-full"
                  href={isAdmin ? "/admin" : "/contributor-profile"}
                  onClick={() => setIsDropdownOpen(false)}
                >
                  <IconUser className="h-4 w-4 flex-shrink-0" />
                  <span>{isAdmin ? "Admin Dashboard" : "Profile"}</span>
                </Link>
              </div>
            </div>
          )}
        </div>
      ) : (
        <Link href="/sign-in">
          <Button className="bg-transparent shadow-none hover:bg-white text-stone-700 text-sm font-bold  cursor-pointer">
            Sign In
            <span className="text-[#FF202B]">
              <IconUser className="h-4 w-4" />
            </span>
          </Button>
        </Link>
      )}
    </div>
  );
};

export default UserProfileDropdown;
