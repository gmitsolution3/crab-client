import { ComLogo } from "../components/ComLogo";
import HeaderSearchBar from "../components/HeaderSearchBar";
import { BookCard } from "../components/BookCard";
import Link from "next/link";

export const categories = [
  "All Products",
  "Health Accessories",
  "Winter Items",
  "Ladies Trendy Fashion Wear",
  "Cables",
  "Home & Living",
  "Electronic",
];

const Navbar = () => {
  return (
    <div className="max-w-full bg-white">
      <div className="border-b border-gray-300">
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
          <HeaderSearchBar />
          <BookCard />
        </div>
      </div>
      <div className="border-b border-gray-300">
        <div className="max-w-400 mx-auto flex py-3 justify-center">
          {categories.map((category) => (
            <Link
              href=""
              key={category}
              className="py-2 text-sm text-gray-900 font-semibold hover:cursor-pointer hover:text-[#269ED9] ml-4"
            >
              {category}
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Navbar;
