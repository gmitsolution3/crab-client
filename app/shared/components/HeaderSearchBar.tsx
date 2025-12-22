// components/HeaderSearchBar.tsx

"use client";

import { useState } from "react";
import { ChevronDown, ChevronUp, Search, Phone } from "lucide-react"; // optional: lucide icons
import { categories } from "../navbar/page";



export default function HeaderSearchBar() {
  const [isOpen, setIsOpen] = useState(false);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="flex items-center h-16">
      {/* Search Bar */}
      <div className="mx-4">
        <div className="relative flex items-center gap-2">
          {/* Search Input */}
          <div className="relative">
            <input
              type="text"
              placeholder="Search products..."
              className="w-72.5 px-4 py-2 text-gray-900 border bg-gray-100 border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-500 outline-none rounded-l-2xl"
            />
          </div>

          {/* Categories Dropdown */}
          <div className="relative">
            <button
              onClick={toggleDropdown}
              className="flex items-center justify-between px-4 py-2.5 text-sm font-medium text-gray-700 bg-gray-100 border border-gray-300 hover:bg-gray-200 min-w-40"
            >
              <span>Categories</span>
              {isOpen ? (
                <ChevronUp className="w-4 h-4 ml-2" />
              ) : (
                <ChevronDown className="w-4 h-4 ml-2" />
              )}
            </button>

            {/* Dropdown Menu */}
            {isOpen && (
              <div className="absolute left-0 z-10 w-56 mt-2 origin-top-left bg-white border border-gray-200 rounded-md shadow-lg">
                <div className="py-1">
                  {categories.map((category) => (
                    <button
                      key={category}
                      className="block w-full px-4 py-2 text-sm text-left text-gray-700 font-semibold hover:cursor-pointer hover:text-white hover:bg-[#2C7BE5]"
                      onClick={() => {
                        // Handle category selection here
                        console.log(`Selected: ${category}`);
                        setIsOpen(false);
                      }}
                    >
                      {category}
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Search Button */}
          <button className="px-3 py-2.5 text-gray-500 bg-gray-100 rounded-r-2xl hover:bg-[#2C7BE5] focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 hover:cursor-pointer hover:text-white border border-gray-300">
            <Search className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* Call Us Now */}
      <div className="flex items-center space-x-2 ml-3 md:ml-8 lg:ml-11">
        <div className="p-3 rounded-full bg-gray-100">
          <Phone className="w-5 h-5 text-[#0970B4]" />
        </div>
        <div className="text-sm font-medium text-gray-800">
          Call Us Now <br />{" "}
          <span className="text-[#0970B4]">(12) 345 67895</span>
        </div>
      </div>
    </div>
  );
}
