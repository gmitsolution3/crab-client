"use client";

import { useAuth } from "@/app/context/AuthContext";
import Link from "next/link";
import React, { useState } from "react";
import { toast } from "react-toastify";

export const NavBarMenu = () => {
  const { user, isAuthenticated, logout, loading } = useAuth();
  const [dropdownOpen, setDropdownOpen] = useState(false);


  if (loading) return <div className="animate">loading...</div>;

  const handleLogout = () => {
    logout();
    toast.success("Logout successfully");
  };

  return (
    <div className="hidden md:flex items-center gap-4 relative">
      {!isAuthenticated ? (
        <>
          <Link
            href="/auth/sign-in"
            className="hover:cursor-pointer px-3 py-2 border font-bold border-[#f58313] rounded-lg hover:bg-white hover:text-[#f58313]"
          >
            Log in
          </Link>
          <h5 className="hover:cursor-pointer px-3 py-2 border font-bold border-[#f58313] rounded-lg hover:bg-white hover:text-[#f58313]">
            Order Tracking
          </h5>
          <h5 className="hover:cursor-pointer px-3 py-2 border font-bold border-[#f58313] rounded-lg hover:bg-white hover:text-[#f58313]">
            Return Policy
          </h5>
        </>
      ) : (
        <div className="relative">
          {/* Profile circle */}
          <div
            className="w-10 h-10 rounded-full bg-[#f58313] flex items-center justify-center text-white font-bold cursor-pointer"
            onMouseEnter={() => setDropdownOpen(true)}
            // onMouseLeave={() => setDropdownOpen(false)}
          >
            {user?.name?.charAt(0).toUpperCase() || "U"}
          </div>

          {/* Dropdown menu */}
          {dropdownOpen && (
            <div
              className="absolute right-0 mt-4 w-40 bg-white border border-gray-200 rounded-lg shadow-lg z-50"
              onMouseEnter={() => setDropdownOpen(true)}
              onMouseLeave={() => setDropdownOpen(false)}
            >
              <Link
                href="/profile"
                className="block px-4 py-2 text-gray-700 hover:bg-[#0970B4] hover:text-white hover:cursor-pointer"
              >
                Profile
              </Link>
              <h5 className="block px-4 py-2 text-gray-700 hover:bg-[#0970B4] hover:text-white hover:cursor-pointer">
                Order Tracking
              </h5>
              <h5 className="block px-4 py-2 text-gray-700 hover:bg-[#0970B4] hover:text-white hover:cursor-pointer">
                Return Policy
              </h5>

              <button
                onClick={handleLogout}
                className="w-full text-left px-4 py-2 text-gray-700 hover:bg-[#0970B4] hover:text-white hover:cursor-pointer border-t border-gray-300"
              >
                Logout
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
};
