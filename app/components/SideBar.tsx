import React from "react";
import { categories } from "../shared/navbar/page";
import { Menu } from "lucide-react";

export const SideBar = () => {
  return (
    <div className="z-10 w-70 mt-2 origin-top-left bg-white border border-gray-200 rounded-md shadow-lg">
      <div>
        <div className="bg-gray-300">
          <div className="flex px-4 py-4 gap-2">
            <Menu />{" "}
            <h1 className="text-[#123460] font-bold">ALL CATEGORIES</h1>
          </div>
        </div>
        {categories.map((category) => (
          <button
            key={category}
            className="block w-full border-b border-b-gray-100 px-4 py-3 text-sm text-left text-gray-700 bg-linear-to-t hover:from-[#0970B4] hover:to-[#3CB1FF] font-semibold hover:cursor-pointer hover:text-white"
            //   onClick={() => {
            //     // Handle category selection here
            //     console.log(`Selected: ${category}`);

            //   }}
          >
            {category}
          </button>
        ))}
      </div>
    </div>
  );
};
