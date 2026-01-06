"use client";

import React, { useState } from "react";
import clsx from "clsx";
import Link from "next/link";
import { Menu, X } from "lucide-react";

export const MenuNavbar = ({ categories }: any) => {
  const [activeCategory, setActiveCategory] = useState("all");
  const [open, setOpen] = useState(false);

  const handleClick = (id: string) => {
    setActiveCategory(id);
    setOpen(false);
  };

  return (
    <div className="border-t border-gray-200 lg:py-3">
      <div className="max-w-7xl mx-auto px-4">
        {/* 🔹 Mobile Header */}
        <div className="flex items-center justify-between py-3 lg:hidden">
          <span className="font-semibold text-gray-800">Categories</span>
          <button
            onClick={() => setOpen(!open)}
            className={clsx("transition-transform", open && "rotate-90")}
          >
            {open ? <X /> : <Menu />}
          </button>
        </div>

        {/* 🔹 Menu Items */}
        <div
          className={clsx(
            "overflow-hidden transition-all duration-300 ease-in-out lg:overflow-visible",
            open
              ? "max-h-96 opacity-100"
              : "max-h-0 opacity-0 lg:max-h-full lg:opacity-100",
            "lg:opacity-100"
          )}
        >
          <div className="flex flex-col lg:flex-row lg:justify-center lg:items-center gap-2 px-2 py-2 lg:py-0">
            {/* All Products */}
            <Link href={`/`}>
              <button
                onClick={() => handleClick("all")}
                className={clsx(
                  "w-full lg:w-auto text-left px-4 py-2 text-sm font-semibold rounded-md transition whitespace-nowrap",
                  activeCategory === "all"
                    ? "bg-linear-to-t from-[#0970B4] to-[#3CB1FF] text-white"
                    : "text-gray-700 hover:bg-linear-to-t hover:from-[#0970B4] hover:to-[#3CB1FF] hover:text-white"
                )}
              >
                All Product
              </button>
            </Link>

            {/* Categories */}
            {categories.map((category: any) => (
              <Link href={`/shop/${category._id}`} key={category._id}>
                <button
                  onClick={() => handleClick(category._id)}
                  className={clsx(
                    "w-full lg:w-auto text-left px-4 py-2 text-sm font-semibold rounded-md transition whitespace-nowrap",
                    activeCategory === category._id
                      ? "bg-linear-to-t from-[#0970B4] to-[#3CB1FF] text-white"
                      : "text-gray-700 hover:bg-linear-to-t hover:from-[#0970B4] hover:to-[#3CB1FF] hover:text-white"
                  )}
                >
                  {category.name}
                </button>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
