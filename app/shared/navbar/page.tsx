import dynamic from "next/dynamic";

import { ComLogo } from "../components/ComLogo";

import { getCategories, getMarquee } from "@/lib/categories";

import { getBrandInfo } from "@/lib/social";

/**
 * Dynamic imports
 * Huge JS reduction
 */

const HeaderSearchBar = dynamic(
  () => import("../components/HeaderSearchBar"),
);

const BookCard = dynamic(() =>
  import("../components/BookCard").then((mod) => mod.BookCard),
);

const MenuNavbar = dynamic(() =>
  import("../components/Menu").then((mod) => mod.MenuNavbar),
);

const NavBarMenu = dynamic(() =>
  import("../components/navBarMenu").then((mod) => mod.NavBarMenu),
);

const AccountDropdown = dynamic(
  () => import("../components/AccountDropdown"),
);

const MarqueeText = dynamic(() => import("../components/marquee"));

const Navbar = async () => {
  /**
   * Parallel fetching
   */
  const [categoriesResult, brandInfoRaw, marqueeText] =
    await Promise.all([
      getCategories(),
      getBrandInfo(),
      getMarquee(),
    ]);

  /**
   * Minimal category payload
   */
  const categories =
    categoriesResult?.data?.map((cat: any) => ({
      _id: cat._id,
      name: cat.name,
      slug: cat.slug,
      subCategories: cat.subCategories,
    })) || [];

  const brandInfo = {
    logo: brandInfoRaw?.data?.logo || "/placeholder.svg",

    name: brandInfoRaw?.data?.name || "GMIT",

    phone: brandInfoRaw?.data?.phone || "+88001234567",
  };

  return (
    <header className="w-full bg-white sticky top-0 z-50 shadow-sm">
      {/* TOP BAR */}
      <div className="bg-gradient-to-r from-gray-50 to-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4">
          <div className="h-10 flex justify-between items-center text-sm">
            <p className="text-gray-600 font-medium hidden md:block">
              Welcome to {brandInfo.name}
            </p>

            <div className="flex items-center gap-6 ml-auto">
              <NavBarMenu />

              <div className="md:hidden">
                <AccountDropdown />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* MAIN HEADER */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex flex-col lg:flex-row items-center justify-between py-4 gap-4 lg:gap-6">
            {/* LOGO */}
            <div className="shrink-0">
              <ComLogo />
            </div>

            {/* SEARCH */}
            <div className="flex-1 w-full max-w-3xl">
              <HeaderSearchBar
                categories={categories}
                name={brandInfo.name}
                phone={brandInfo.phone}
              />
            </div>

            {/* CART */}
            <div className="flex items-center gap-3">
              <BookCard />
            </div>
          </div>
        </div>
      </div>

      {/* MENU */}
      <div className="bg-white border-b border-gray-200 py-4">
        <MenuNavbar categories={categories} />
      </div>

      {/* MARQUEE */}
      <MarqueeText
        text={marqueeText?.data?.text || "marquee text here"}
      />
    </header>
  );
};

export default Navbar;
