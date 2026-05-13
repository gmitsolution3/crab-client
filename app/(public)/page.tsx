import { getBanner } from "@/lib/banner";
import { AllProduct } from "@/lib/products";
import { FeaturedProduct } from "../components/featuredProduct";
import ProductSliderSection from "../components/heroSlider";
import { OurTopCategory } from "../components/outTopCategorry";
import { TopSellingProduct } from "../components/topSellingProduct";
import ShowProduct from "./shop/components/showProduct";
import { groupProducts } from "@/utils/groupProducts";

const MainPage = async () => {
  const [productRes, bannerRes] = await Promise.all([
    AllProduct(),
    fetch(`${process.env.NEXT_PUBLIC_EXPRESS_SERVER_BASE_URL}/banner`, {
      next: { revalidate: 300 },
    }).then((res) => res.json()),
  ]);

  const products = productRes.data;

  const {
    mainBanner,
    secondBanner,
    thirdBanner,
  } = bannerRes.data || {
    mainBanner: [],
    secondBanner: [],
    thirdBanner: [],
  };

  const toArray = (v: any) =>
    Array.isArray(v) ? v : v ? [v] : [];

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

  const groupedProducts = groupProducts(products);

  return (
    <div>
      <div className="bg-white">
        <ProductSliderSection
          mainSlider={mainSliderData}
          sideSliders={sideSliderData}
        />
      </div>

      <OurTopCategory />

      <FeaturedProduct />

      <TopSellingProduct />

      <div className="max-w-7xl mx-auto">
        <div className="my-5 border-b-2 border-b-gray-300 pb-3">
          <h1 className="text-4xl font-bold pl-4">
            Find your best one
          </h1>

          <p className="text-sm pl-4 text-gray-700">
            We provide our best quality
          </p>
        </div>

        {products.length === 0 ? (
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
