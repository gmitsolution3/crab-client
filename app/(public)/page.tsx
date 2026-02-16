import { AllProduct } from "@/lib/products";
import ProductSliderSection from "../components/heroSlider";
import { OurTopCategory } from "../components/outTopCategorry";
import { FeaturesSection } from "../components/FeaturesSection";
import { FeaturedProduct } from "../components/featuredProduct";
import ShowProduct from "./shop/components/showProduct";
import { TopSellingProduct } from "../components/topSellingProduct";
import axios from "axios";
import SplitSlider from "../components/heroSlider";



const MainPage = async () => {
  const res = await AllProduct();
  const products = res.data;

  const result = await fetch(
    `${process.env.NEXT_PUBLIC_EXPRESS_SERVER_BASE_URL}/banner`,
    {
      next: { revalidate: 300 },
    }
  ).then((res) => res.json());

  const { mainBanner, secondBanner, thirdBanner } = result.data || {
    mainBanner: [],
    secondBanner: [],
    thirdBanner: [],
  };

  const toArray = (v: any) => (Array.isArray(v) ? v : v ? [v] : []);

  const sideSliderData =
    [
      { id: "side-1", images: toArray(secondBanner) },
      { id: "side-2", images: toArray(thirdBanner) },
    ].flat() || [];

  const mainSliderData = { id: "main", images: toArray(mainBanner) };

  const getIp = await axios.get(
    `${process.env.NEXT_PUBLIC_EXPRESS_SERVER_BASE_URL}/api`,
  );



  return (
    <div>
      <div className="bg-white">
        <ProductSliderSection
          mainSlider={mainSliderData}
          sideSliders={sideSliderData}
        />
        {/* <SplitSlider mainSlider={mainSliderData} sideSliders={sideSliderData} /> */}
      </div>

      <div>
        <OurTopCategory />
      </div>

      <div>
        <FeaturedProduct />
      </div>

      {/* top selling product */}
      <div>
        <TopSellingProduct />
      </div>

      <div className="max-w-7xl mx-auto">
        <div className="my-5 border-b-2 border-b-gray-300 pb-3">
          <h1 className="text-4xl font-bold pl-4">Find your best one</h1>
          <p className="text-sm pl-4 text-gray-700">
            We provide our best quality
          </p>
        </div>

        {products.length === 0 ? (
          <div className="min-h-screen flex justify-center items-center text-3xl text-primary">
            no data found
          </div>
        ) : (
          <div>
            {/* <ProductCard products={products} /> */}
            <ShowProduct products={products} />
            {/* <ProductCard products={products} /> */}
          </div>
        )}
      </div>
    </div>
  );
};

export default MainPage;
