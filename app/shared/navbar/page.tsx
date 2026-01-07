import { ComLogo } from "../components/ComLogo";
import HeaderSearchBar from "../components/HeaderSearchBar";
import { BookCard } from "../components/BookCard";
import Link from "next/link";
import clsx from "clsx";
import { Menu } from "lucide-react";
import { getCategories } from "@/lib/categories";
import { MenuNavbar } from "../components/Menu";
import AccountDropdown from "../components/AccountDropdown";

const Navbar = async () => {
  const getAllCategories = await getCategories();

  return (
    <header className="w-full bg-white">
      <div className="max-w-full bg-white">
        <div className="border-b border-gray-100 bg-[#0970B4]">
          <div className="h-14 max-w-400 mx-auto px-4 flex justify-between items-center text-white">
            <h5>Welcome to our website</h5>
            <div className="hidden md:flex items-center gap-4 ">
              <h5 className="hover:cursor-pointer px-3 py-2 border border-[#1594e9] rounded-lg hover:bg-white hover:text-[#0970B4]">
                Log in
              </h5>
              <h5 className="hover:cursor-pointer px-3 py-2 border border-[#1594e9] rounded-lg hover:bg-white hover:text-[#0970B4]">
                Order Tracking
              </h5>
              <h5 className="hover:cursor-pointer px-3 py-2 border border-[#1594e9] rounded-lg hover:bg-white hover:text-[#0970B4]">
                Return Policy
              </h5>
            </div>
            <div className="block md:hidden">
              <AccountDropdown />
            </div>
          </div>
        </div>
        <div className="border-b border-gray-300">
          <div className="max-w-7xl mx-auto px-4 flex flex-row gap-4 lg:gap-0 justify-between items-center py-5">
            <ComLogo />
            <div className="hidden md:block">
              <HeaderSearchBar categories={getAllCategories.data} />
            </div>
            <BookCard />
          </div>
        </div>
        <div className="sticky top-0 z-50 bg-white border-b border-gray-300 shadow-md">
          <MenuNavbar categories={getAllCategories.data} />
        </div>
      </div>
    </header>
  );
};

export default Navbar;
