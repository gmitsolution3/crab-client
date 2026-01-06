"use client";

import React from "react";
import * as LucideIcons from "lucide-react";

interface SubCategory {
  name: string;
  slug: string;
  isActive: boolean;
  id: string;
}

interface Category {
  isActive: boolean;
  name: string;
  order: number;
  slug: string;
  subCategories: SubCategory[];
  _id: string;
}

// Get a list of some Lucide icons
const iconList = [
  LucideIcons.Box,
  LucideIcons.Cpu,
  LucideIcons.Heart,
  LucideIcons.Watch,
//   LucideIcons.Shoe,
  LucideIcons.Thermometer,
  LucideIcons.ShoppingBag,
  LucideIcons.Gift,
];

interface TopCategoriesProps {
  categories: Category[];
}

export const TopCategories = ({ categories }: TopCategoriesProps) => {
  return (
    <section className="py-8 px-4 md:px-8 lg:px-16">
      <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-6">
        Top Categories
      </h2>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4 sm:gap-6">
        {categories.map((cat, index) => {
          // Pick a random icon for each category (based on index to keep consistent)
          const IconComponent = iconList[index % iconList.length];

          return (
            <div
              key={cat._id}
              className="flex flex-col items-center justify-center gap-2 p-4 bg-white rounded-xl shadow hover:shadow-lg transition cursor-pointer text-center"
            >
              {/* Icon */}
              <div className="bg-[#E6F0FA] rounded-full p-3 mb-2">
                <IconComponent size={28} className="text-[#0970B4]" />
              </div>

              {/* Name */}
              <span className="text-sm sm:text-base font-medium text-gray-900">
                {cat.name}
              </span>
            </div>
          );
        })}
      </div>
    </section>
  );
};
