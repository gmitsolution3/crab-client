import { ComLogo } from "../components/ComLogo";
import HeaderSearchBar from "../components/HeaderSearchBar";
import { BookCard } from "../components/BookCard";
import Link from "next/link";
import clsx from "clsx";
import { Menu } from "lucide-react";
import { MenuNavbar } from "../components/Menu";
import { getCategories } from "@/lib/categories";


const Navbar =async () => {

  const getAllCategories = await getCategories()

  return (
    <div className="max-w-full bg-white">
      <div className="border-b border-gray-100">
        <div className="h-14 max-w-400 mx-auto flex justify-between items-center">
          <h5>Welcome to our website</h5>
          <div className="flex items-center gap-4">
            <h5 className="hover:cursor-pointer hover:underline">Log in</h5>
            <h5 className="hover:cursor-pointer hover:underline">
              Order Tracking
            </h5>
            <h5 className="hover:cursor-pointer hover:underline">
              Return Policy
            </h5>
          </div>
        </div>
      </div>
      <div className="border-b border-gray-300">
        <div className="max-w-400 mx-auto flex justify-between items-center py-5">
          <ComLogo />
          <HeaderSearchBar categories={getAllCategories.data} />
          <BookCard />
        </div>
      </div>
      <div className="border-b border-gray-300">
        <MenuNavbar categories={getAllCategories.data} />
      </div>
    </div>
  );
};

export default Navbar;
