"use client";

import { useAuth } from "@/app/context/AuthContext";
import Link from "next/link";
import { useState } from "react";
import { toast } from "sonner";

export default function AccountDropdown() {
  const { user, isAuthenticated, logout, loading } = useAuth();
  const [open, setOpen] = useState(false);

  if (loading) return null;

  const handleLogout = () => {
    logout();
    toast.success("Logout successfully");
    setOpen(false);
  };

  return (
    <div className="relative">
      {/* Toggle button */}
      {!isAuthenticated ? (
        <button
          onClick={() => setOpen((prev) => !prev)}
          className="cursor-pointer border px-3 py-2 text-sm rounded-lg font-bold bg-primary text-white hover:bg-[#d9720f] transition-colors"
        >
          My Account
        </button>
      ) : (
        <div
          className="w-10 h-10 rounded-full bg-[#b36211] flex items-center justify-center text-white font-bold cursor-pointer hover:bg-[#97520d] transition-colors"
          onClick={() => setOpen((prev) => !prev)}
        >
          {user?.name?.charAt(0).toUpperCase() || "U"}
        </div>
      )}

      {/* Dropdown Menu */}
      {open && (
        <div
          className="absolute right-0 mt-2 w-48 bg-white border border-gray-200 rounded-lg shadow-md z-50"
          onMouseLeave={() => setOpen(false)}
        >
          <ul className="flex flex-col divide-y divide-gray-200">
            {!isAuthenticated && (
              <>
                <li>
                  <Link
                    href="/auth/sign-in"
                    className="block px-4 py-2 font-bold text-gray-800 hover:bg-primary hover:text-white rounded-t-lg transition-colors"
                  >
                    Log in
                  </Link>
                </li>
                <li>
                  <button className="w-full text-left px-4 py-2 font-bold text-gray-800 hover:bg-primary hover:text-white transition-colors">
                    Order Tracking
                  </button>
                </li>
                <li>
                  <button className="w-full text-left px-4 py-2 font-bold text-gray-800 hover:bg-primary hover:text-white rounded-b-lg transition-colors">
                    Return Policy
                  </button>
                </li>
              </>
            )}

            {isAuthenticated && (
              <>
                <li>
                  <Link
                    href="/profile"
                    className="block px-4 py-2 font-bold text-gray-800 hover:bg-primary hover:text-white rounded-t-lg transition-colors"
                  >
                    Profile
                  </Link>
                </li>
                <li>
                  <button className="w-full text-left px-4 py-2 font-bold text-gray-800 hover:bg-primary hover:text-white transition-colors">
                    Order Tracking
                  </button>
                </li>
                <li>
                  <button className="w-full text-left px-4 py-2 font-bold text-gray-800 hover:bg-primary hover:text-white transition-colors">
                    Return Policy
                  </button>
                </li>
                <li>
                  <button
                    onClick={handleLogout}
                    className="w-full text-left px-4 py-2 font-bold text-gray-800 hover:bg-primary hover:text-white rounded-b-lg border-t border-gray-200 transition-colors"
                  >
                    Logout
                  </button>
                </li>
              </>
            )}
          </ul>
        </div>
      )}
    </div>
  );
}
