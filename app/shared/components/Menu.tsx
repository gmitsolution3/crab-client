"use client";

import React, { useState } from "react";
import clsx from "clsx";
import Link from "next/link";

export const MenuNavbar = ({ categories }: any) => {
  const [activeCategory, setActiveCategory] = useState("all");

  const handleClick = (id: string) => {
    setActiveCategory(id);
    // onCategoryChange(id);
  };

  return (
    <div className="max-w-400 mx-auto flex py-3 justify-center">
      <div className="max-w-400 mx-auto flex py-3 justify-center">
        <Link href={`/`}>
          <button
            onClick={() => handleClick("all")}
            className={clsx(
              "block border-b border-gray-100 px-4 py-3 text-sm text-left font-semibold transition",
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
                "py-2 text-sm text-gray-900 font-semibold hover:cursor-pointer  ml-4 px-3",
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
