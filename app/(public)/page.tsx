import { AllProduct } from "@/lib/products";
import { ProductCard } from "./shop/components/productCard";
import ProductSliderSection from "../components/heroSlider";
import { OurTopCategory } from "../components/outTopCategorry";
import { FeaturesSection } from "../components/FeaturesSection";
import { FeaturedProduct } from "../components/featuredProduct";

const MainPage = async () => {
  const res = await AllProduct();
  const products = res.data;



  if (products.length === 0) {
    return (
      <div className="min-h-screen flex justify-center items-center text-3xl text-blue-800">
        no data found
      </div>
    );
  }

  // Sample data - replace with your actual product data
  const mainSliderData = {
    id: "main",
    title: "Geyser - Premium Home Appliances",
    description: "Experience premium quality at amazing prices",
    images: [
      "https://i.postimg.cc/Y0S4Jhh8/vastralaya-blog.webp",
      "https://i.postimg.cc/PJKxyhyw/Banner-1.webp",
      "https://i.postimg.cc/BbN6pspv/bcc078d9-a54b-40ea-931a-6e4f9a843ceb-CR0-0-1464-600-PT0-SX1464-V1.jpg",
      "https://i.postimg.cc/nrTz2Z2n/black-friday-super-sale-web-banner-template-120329-6598.avif",
      "https://i.postimg.cc/J0dymMk2/1102eabf23fd86bd38bb5d92169f28d3.jpg",
    ],
  };

  const sideSliderData = [
    {
      id: "side1",
      title: "Galaxy Watch7",
      images: [
        "https://i.postimg.cc/jdPKRRP4/360-F-228061532-b7Bwt62Mg3u8Lso-Dv-BCi-KPr9Mv-Qf-Iunj.jpg",
        "https://i.postimg.cc/VLn1zzng/fashion-sale-52683-41938.avif",
        "https://i.postimg.cc/rFxcqqxJ/pngtree-a-men-s-olive-green-winter-parka-with-fur-trimmed-hood-image-20534810.webp",
      ],
    },
    {
      id: "side2",
      title: "Induction Cooker",
      images: [
        "https://i.postimg.cc/nrwsZpm8/cotton-kurti-banner-1-1200x1200.webp",
        "https://i.postimg.cc/sXmQ6pDZ/image-17195783422175.jpg",
        "https://i.postimg.cc/6q17wtv1/seasons-mobile-shop-banner-19.webp",
      ],
    },
  ];

  return (
    <div>
      <div className="bg-white">
        <ProductSliderSection
          mainSlider={mainSliderData}
          sideSliders={sideSliderData}
        />
      </div>

      <div>
        <OurTopCategory />
      </div>

      <div className="max-w-7xl mx-auto">
        <div className="my-5">
          <h1 className="text-4xl font-bold pl-4">All Product</h1>
          <p className="text-sm pl-4 text-gray-700">
            We provide our best quality
          </p>
        </div>
        <div>
          <ProductCard products={products} />
        </div>
        <div>
          <div className="my-5">
            <h1 className="text-4xl font-bold pl-4 text-center">
              Why choice us
            </h1>
          </div>
          <div>
            <FeaturesSection />
          </div>
        </div>
        <div>
          <FeaturedProduct />
        </div>
      </div>
    </div>
  );
};

export default MainPage;
