"use client";

import React, { useState } from "react";
// import { categories } from "../shared/navbar/page";
import { Menu } from "lucide-react";
import clsx from "clsx";
import Link from "next/link";

export const SideBar = ({ categories }: any) => {
  const [activeCategory, setActiveCategory] = useState("all");

  const handleClick = (id: string) => {
    setActiveCategory(id);
  };

  return (
    <div className="z-10 w-70 mt-2 bg-white border border-gray-200 rounded-md shadow-lg">
      <div className="bg-gray-300">
        <div className="flex px-4 py-4 gap-2 items-center">
          <Menu />
          <h1 className="text-[#123460] font-bold">ALL CATEGORIES</h1>
        </div>
      </div>
      <div>
        <Link href={`/`}>
          <button
            onClick={() => handleClick("all")}
            className={clsx(
              "block w-full border-b border-gray-100 px-4 py-3 text-sm text-left font-semibold transition",
              activeCategory === "all"
                ? "bg-linear-to-t from-[#0970B4] to-[#3CB1FF] text-white"
                : "text-gray-700 hover:bg-linear-to-t hover:from-[#0970B4] hover:to-[#3CB1FF] hover:text-white"
            )}
          >
            All Product
          </button>
        </Link>

        {categories.map((category: any) => (
          <Link href={`/shop/${category._id}`}>
            <button
              key={category._id}
              onClick={() => handleClick(category._id)}
              className={clsx(
                "block w-full border-b border-gray-100 px-4 py-3 text-sm text-left font-semibold transition",
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
  );
};
