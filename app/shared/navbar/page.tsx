import { ComLogo } from "../components/ComLogo";
import HeaderSearchBar from "../components/HeaderSearchBar";
import { BookCard } from "../components/BookCard";
import { getCategories } from "@/lib/categories";
import { MenuNavbar } from "../components/Menu";
import AccountDropdown from "../components/AccountDropdown";
import MarqueeText from "../components/marquee";
import { getBrandInfo } from "@/lib/social";
import Link from "next/link";

const Navbar = async () => {
  const getAllCategories = await getCategories();

  const brandInfoRaw = await getBrandInfo();

  const brandInfo = {
    logo: brandInfoRaw?.data?.logo ?? "/placeholder.svg",
    name: brandInfoRaw?.data?.name ?? "GMIT",
    phone: brandInfoRaw?.data?.phone ?? "+88001234567",
    socials: brandInfoRaw?.data?.socials ?? [],
  };

  return (
    <header className="w-full bg-white">
      <div className="max-w-full bg-white">
        <div className="border-b border-gray-100 bg-[#0970B4]">
          <div className="h-14 max-w-400 mx-auto px-4 flex justify-between items-center text-white">
            <h5>Welcome to our website</h5>
            <div className="hidden md:flex items-center gap-4 ">
              <Link
                href="/auth/sign-in"
                className="hover:cursor-pointer px-3 py-2 border font-bold border-[#1594e9] rounded-lg hover:bg-white hover:text-[#0970B4]"
              >
                Log in
              </Link>
              <h5 className="hover:cursor-pointer px-3 py-2 border font-bold border-[#1594e9] rounded-lg hover:bg-white hover:text-[#0970B4]">
                Order Tracking
              </h5>
              <h5 className="hover:cursor-pointer px-3 py-2 border font-bold border-[#1594e9] rounded-lg hover:bg-white hover:text-[#0970B4]">
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
              <HeaderSearchBar
                categories={getAllCategories.data}
                name={brandInfo.name}
                phone={brandInfo.phone}
              />
            </div>
            <BookCard />
          </div>
        </div>
        <div className="bg-white border-b border-gray-300 shadow-md">
          <MenuNavbar categories={getAllCategories.data} />
        </div>
        <div className="bg-white border-b border-gray-300 shadow-md">
          <MarqueeText />
        </div>
      </div>
    </header>
  );
};

export default Navbar;
