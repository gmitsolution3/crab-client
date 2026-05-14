import { getHomeData } from "@/lib/homeData";
import { AllProduct } from "@/lib/products";
import { groupProducts } from "@/utils/groupProducts";
import { FeaturedProduct } from "../components/featuredProduct";
import ProductSliderSection from "../components/heroSlider";
import { OurTopCategory } from "../components/outTopCategorry";
import { TopSellingProduct } from "../components/topSellingProduct";
import ShowProduct from "./shop/components/showProduct";

const MainPage = async () => {
  const [productRes] = await Promise.all([AllProduct()]);

  //? Root home data
  const homeData = await getHomeData();

  //? banner data
  const banners = homeData?.bannerData || {};

  //? top category data 
  const categories = homeData?.categoryData || [];

  //? featured products Data
  const featuredProducts = homeData?.featuredProductData || [];

  //? top selling products
  const topSellingProducts = homeData?.topSellingProductData || [];

  //? grouped product data
  const groupedProducts = homeData?.groupedProduct || [];

  const toArray = (v: any) => (Array.isArray(v) ? v : v ? [v] : []);

  const { mainBanner, secondBanner, thirdBanner } = banners || {
    mainBanner: [],
    secondBanner: [],
    thirdBanner: [],
  };

  const sideSliderData = [
    {
      id: "side-1",
      images: toArray(secondBanner),
    },
    {
      id: "side-2",
      images: toArray(thirdBanner),
    },
  ];

  const mainSliderData = {
    id: "main",
    images: toArray(mainBanner),
  };

  return (
    <div>
      <div className="bg-white">
        <ProductSliderSection
          mainSlider={mainSliderData}
          sideSliders={sideSliderData}
        />
      </div>

      <OurTopCategory categories={categories} />

      <FeaturedProduct featuredProducts={featuredProducts} />

      <TopSellingProduct topSellingProducts={topSellingProducts} />

      <div className="max-w-7xl mx-auto">
        <div className="my-5 border-b-2 border-b-gray-300 pb-3">
          <h1 className="text-4xl font-bold pl-4">
            Find your best one
          </h1>

          <p className="text-sm pl-4 text-gray-700">
            We provide our best quality
          </p>
        </div>

        {groupedProducts.length === 0 ? (
          <div className="min-h-screen flex justify-center items-center text-3xl text-primary">
            no data found
          </div>
        ) : (
          <ShowProduct groupedProducts={groupedProducts} />
        )}
      </div>
    </div>
  );
};

export default MainPage;
