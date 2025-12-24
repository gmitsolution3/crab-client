import React from "react";
import { ProductFormData } from "../admin/products/components/AddProduct";
import Image from "next/image";
import { ShoppingCart } from "lucide-react";
import { FaWhatsapp } from "react-icons/fa";

const MainPage = async () => {
  const res = await fetch("http://localhost:5000/api/products", {
    next: { revalidate: 60 },
    // cache: "no-store"
  });
  const result = await res.json();

  const products = result.data;

  console.log(products);

  if (products.length === 0) {
    return (
      <div className="min-h-screen flex justify-center items-center text-3xl text-blue-800">
        no data found
      </div>
    );
  }

  console.log(products);
  return (
    <div className="bg-white p-4 rounded-xl">
      <div className="flex gap-4">
        {products.map((pro: ProductFormData, index: number) => (
          <div
            key={index}
            className="w-60 rounded-xl border border-gray-200 bg-white hover:shadow-lg overflow-hidden hover:border hover:border-blue-700 hover:cursor-pointer"
          >
            <div className="relative bg-linear-to-br from-gray-900 to-gray-700 p-4 h-56 ">
              {/* <span className="absolute top-3 left-3 bg-red-600 text-white text-xs font-bold px-2 py-1 rounded">
                MEGA SALE
              </span>

              <div className="text-white text-sm mt-6">
                <p className="font-semibold">MOTOROLA</p>
                <p className="text-yellow-400 font-bold">Snapdragon 6s Gen 3</p>
                <p className="text-xs mt-1">6.7 curved display</p>
              </div> */}

              <Image
                src={typeof pro.thumbnail === "string" ? pro.thumbnail : ""}
                alt={pro.title}
                fill
                priority
                className="object-cover"
              />

              {/* <div className="right-2 bottom-0 w-56 h-50">
                <Image
                  src={typeof pro.thumbnail === "string" ? pro.thumbnail : ""}
                  alt={pro.title}
                  fill
                  priority
                  className="object-contain"
                />
              </div> */}
            </div>

            <div className="p-4 space-y-3">
              <h3 className="font-semibold text-gray-900 text-md leading-snug">
                {pro.title}
              </h3>
              <p className="text-xs">{pro.shortDescription}</p>

              <div className="flex items-center gap-2">
                <span className="text-lg font-bold text-gray-900">
                  {pro.discount.type === "percentage"
                    ? Math.floor(
                        Number(pro.basePrice) -
                          (Number(pro.basePrice) * Number(pro.discount.value)) /
                            100
                      )
                    : Math.max(
                        Number(pro.basePrice) - Number(pro.discount.value),
                        0
                      )}
                  ৳
                </span>
                <span className="text-sm text-red-500 line-through">
                  {pro.basePrice}৳
                </span>
              </div>

              <button className="block w-full border-b border-b-gray-100 px-4 py-3 text-sm text-center bg-linear-to-t from-[#0970B4] to-[#3CB1FF] font-semibold hover:cursor-pointer text-white rounded-lg hover:from-[#3CB1FF] hover:to-[#0970B4]">
                BUY NOW
              </button>

              <button className="w-full bg-linear-to-t from-[#073d19] to-[#09b442] hover:from-[#09b442] hover:to-[#073d19] hover:cursor-pointer text-white py-3 rounded-lg font-semibold flex items-center justify-center text-sm gap-2 hover:bg-green-700 transition">
                <FaWhatsapp />
                ORDER VIA WHATSAPP
              </button>

              <button className="w-full border border-[[#269ED9]] text-[#269ED9] py-2 rounded-lg font-semibold flex items-center justify-center gap-2 hover:bg-[#269ED9] hover:text-white transition hover:cursor-pointer">
                <ShoppingCart /> ADD TO CART
              </button>
            </div>
          </div>
        ))}
      </div>
      <div></div>
    </div>
  );
};

export default MainPage;
