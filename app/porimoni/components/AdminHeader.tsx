"use client"

import { useState } from "react";
import { Bell, Settings, LogOut, User } from "lucide-react";

export function AdminHeader() {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const toggleDropdown = () => setIsDropdownOpen(!isDropdownOpen);

  return (
    <header className="h-16 bg-white border-b border-gray-200 flex items-center justify-between px-4 sm:px-6 lg:px-8 shadow-sm relative">
      {/* Left side - Logo/Brand */}
      <div className="flex items-center gap-3">
        <div className="w-8 h-8 rounded-lg bg-[#0970B4] flex items-center justify-center">
          <span className="text-white font-bold text-lg">A</span>
        </div>
        <div className="hidden sm:block">
          <h1 className="text-lg font-bold text-gray-900">Admin Panel</h1>
          <p className="text-xs text-gray-500">E-commerce Dashboard</p>
        </div>
      </div>

      {/* Right side - Actions */}
      <div className="flex items-center gap-2 relative">
        {/* Notifications */}
        <button className="relative p-2 text-gray-600 hover:bg-gray-100 rounded-lg transition">
          <Bell size={20} />
          <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
        </button>

        {/* Settings - desktop only */}
        <button className="hidden sm:inline-flex p-2 text-gray-600 hover:bg-gray-100 rounded-lg transition">
          <Settings size={20} />
        </button>

        {/* User Profile */}
        <div className="relative">
          <button
            onClick={toggleDropdown}
            className="flex items-center gap-2 ml-2 pl-2 border-l border-gray-200"
          >
            <div className="w-9 h-9 rounded-full bg-[#0970B4] flex items-center justify-center text-white font-semibold">
              JA
            </div>

            {/* Desktop name/role */}
            <div className="hidden sm:flex flex-col text-left">
              <p className="text-sm font-medium text-gray-900">John Admin</p>
              <p className="text-xs text-gray-500">Super Admin</p>
            </div>
          </button>

          {/* Dropdown menu for mobile */}
          {isDropdownOpen && (
            <div className="absolute right-0 mt-2 w-48 bg-white border border-gray-200 rounded-lg shadow-lg z-50 sm:hidden">
              <div className="p-3 border-b border-gray-100">
                <p className="text-sm font-medium text-gray-900">John Admin</p>
                <p className="text-xs text-gray-500">Super Admin</p>
              </div>
              <ul className="flex flex-col">
                <li>
                  <button className="w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-100 flex items-center gap-2">
                    <User size={16} /> Profile
                  </button>
                </li>
                <li>
                  <button className="w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-100 flex items-center gap-2">
                    <Settings size={16} /> Settings
                  </button>
                </li>
                <li>
                  <button className="w-full text-left px-4 py-2 text-red-600 hover:bg-red-50 flex items-center gap-2">
                    <LogOut size={16} /> Logout
                  </button>
                </li>
              </ul>
            </div>
          )}
        </div>

        {/* Logout - desktop only */}
        <button className="hidden sm:inline-flex p-2 text-gray-600 hover:text-red-600 hover:bg-red-50 rounded-lg transition ml-2">
          <LogOut size={20} />
        </button>
      </div>
    </header>
  );
}
