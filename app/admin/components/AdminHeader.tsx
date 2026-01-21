"use client";

import { useState, useRef, useEffect } from "react";
import { Bell, Settings, LogOut, User, Menu, X } from "lucide-react";
import { useAuth } from "@/app/context/AuthContext";
import Link from "next/link";
import { useRouter } from "next/navigation";

export function AdminHeader() {
  const { user, logout } = useAuth();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const router = useRouter();

  /* Close dropdown on outside click */
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(e.target as Node)
      ) {
        setIsDropdownOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleLogout = async () => {
    await logout();
    setIsDropdownOpen(false);
    setIsMobileMenuOpen(false);
    router.push("/auth/sign-in");
  };

  return (
    <>
      {/* ================= HEADER ================= */}
      <header className="min-h-16 bg-white border-b border-gray-200 shadow-sm px-4 sm:px-6">
        <div className="h-16 flex items-center justify-between">
          {/* -------- Left -------- */}
          <div className="flex items-center gap-3">
            {/* Mobile Menu Button */}
            <button
              className="sm:hidden p-2 rounded-lg hover:bg-gray-100"
              onClick={() => {
                setIsMobileMenuOpen(!isMobileMenuOpen);
                setIsDropdownOpen(false);
              }}
            >
              {isMobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
            </button>

            {/* Logo */}
            <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center">
              <span className="text-white font-bold text-lg">A</span>
            </div>

            {/* Title (Desktop only) */}
            <div className="hidden sm:block">
              <h1 className="text-lg font-bold text-gray-900">Admin Panel</h1>
              <p className="text-xs text-gray-500">E-commerce Dashboard</p>
            </div>
          </div>

          {/* -------- Right -------- */}
          <div className="flex items-center gap-2 relative" ref={dropdownRef}>
            {/* Notifications */}
            <button className="relative p-2 text-gray-600 hover:bg-gray-100 rounded-lg">
              <Bell size={20} />
              <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full" />
            </button>

            {/* Settings (Desktop) */}
            <Link
              href="/admin/settings/general"
              className="hidden sm:inline-flex p-2 text-gray-600 hover:bg-gray-100 rounded-lg"
            >
              <Settings size={20} />
            </Link>

            {/* User Button */}
            <button
              onClick={() => {
                setIsDropdownOpen(!isDropdownOpen);
                setIsMobileMenuOpen(false);
              }}
              className="flex items-center gap-2 ml-2 pl-2 border-l border-gray-200"
            >
              <div className="w-9 h-9 rounded-full bg-primary text-white flex items-center justify-center font-semibold">
                {user?.name?.slice(0, 2).toUpperCase() || "AD"}
              </div>

              <div className="hidden sm:flex flex-col text-left">
                <p className="text-sm font-medium text-gray-900">
                  {user?.name || "Admin"}
                </p>
                <p className="text-xs text-gray-500">
                  {user?.role || "Administrator"}
                </p>
              </div>
            </button>

            {/* -------- Dropdown -------- */}
            {isDropdownOpen && (
              <div
                className="
                  absolute 
                  left-0 sm:left-auto
                  right-0
                  top-full 
                  mt-2 
                  w-full sm:w-52
                  bg-white 
                  border 
                  rounded-lg 
                  shadow-lg 
                  z-50
                "
              >
                <div className="p-3 border-b sm:hidden">
                  <p className="text-sm font-medium">{user?.name}</p>
                  <p className="text-xs text-gray-500">{user?.role}</p>
                </div>

                <ul>
                  <li className="border-b hover:bg-primary hover:text-white">
                    <Link
                      href="/profile"
                      onClick={() => setIsDropdownOpen(false)}
                      className="flex gap-2 items-center justify-center py-2 px-3"
                    >
                      <User size={16} /> Profile
                    </Link>
                  </li>

                  <li className="border-b hover:bg-primary hover:text-white">
                    <Link
                      href="/admin/settings/general"
                      onClick={() => setIsDropdownOpen(false)}
                      className="flex gap-2 items-center justify-center py-2 px-3"
                    >
                      <Settings size={16} /> Settings
                    </Link>
                  </li>

                  <li className="text-red-600 hover:bg-red-50">
                    <button
                      onClick={handleLogout}
                      className="w-full flex gap-2 items-center justify-center py-2 px-3"
                    >
                      <LogOut size={16} /> Logout
                    </button>
                  </li>
                </ul>
              </div>
            )}
          </div>
        </div>
      </header>

      {/* ================= MOBILE MENU ================= */}
      {isMobileMenuOpen && (
        <div className="sm:hidden bg-white border-b shadow-md">
          <Link
            href="/profile"
            onClick={() => setIsMobileMenuOpen(false)}
            className="block px-4 py-3 border-b hover:bg-gray-100"
          >
            Profile
          </Link>

          <Link
            href="/admin/settings/general"
            onClick={() => setIsMobileMenuOpen(false)}
            className="block px-4 py-3 border-b hover:bg-gray-100"
          >
            Settings
          </Link>

          <button
            onClick={handleLogout}
            className="w-full text-left px-4 py-3 text-red-600 hover:bg-red-50"
          >
            Logout
          </button>
        </div>
      )}
    </>
  );
}
