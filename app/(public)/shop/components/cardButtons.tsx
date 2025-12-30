// import { ProductFormData } from '@/utils/product';
// import { ShoppingBag, ShoppingCart } from 'lucide-react';
// import React from 'react'
// import { FaWhatsapp } from 'react-icons/fa';

// interface Product {
//   product: ProductFormData
// }

// export const CardButtons = ({ product }: Product) => {
//   return (
//     <div className="space-y-3">
//       <button className="w-full bg-linear-to-t border-b-gray-100 from-[#0970B4] to-[#3CB1FF] hover:from-[#3CB1FF] hover:to-[#0970B4] hover:cursor-pointer text-white py-3 rounded-lg font-semibold flex items-center justify-center text-sm gap-2 transition">
//         <ShoppingBag /> BUY NOW
//       </button>

//       <button className="w-full bg-linear-to-t from-[#073d19] to-[#09b442] hover:from-[#09b442] hover:to-[#073d19] hover:cursor-pointer text-white py-3 rounded-lg font-semibold flex items-center justify-center text-sm gap-2 hover:bg-green-700 transition">
//         <FaWhatsapp />
//         ORDER VIA WHATSAPP
//       </button>

//       <button className="w-full border border-[[#269ED9]] text-[#269ED9] py-2 rounded-lg font-semibold flex items-center justify-center gap-2 hover:bg-[#269ED9] hover:text-white transition hover:cursor-pointer">
//         <ShoppingCart /> ADD TO CART
//       </button>
//     </div>
//   );
// };

"use client"

import { useState } from "react";
import { ShoppingBag, ShoppingCart } from "lucide-react";
import { FaWhatsapp } from "react-icons/fa";
import { ProductFormData } from "@/utils/product";
import ProductVariant from "./ProductVariants";

interface Product {
  product: ProductFormData;
}

export const CardButtons = ({ product }: Product) => {
  const [isCartModalOpen, setIsCartModalOpen] = useState(false);
  const from = "cardButton"

  const handleAddToCart = () => {
    setIsCartModalOpen(true);
  };

  const closeModal = () => {
    setIsCartModalOpen(false);
  };

  return (
    <>
      <div className="space-y-3">
        <button className="w-full bg-linear-to-t from-[#0970B4] to-[#3CB1FF] hover:from-[#3CB1FF] hover:to-[#0970B4] text-white py-3 rounded-lg font-semibold flex items-center justify-center text-sm gap-2 transition">
          <ShoppingBag /> BUY NOW
        </button>

        <button className="w-full bg-linear-to-t from-[#073d19] to-[#09b442] hover:from-[#09b442] hover:to-[#073d19] text-white py-3 rounded-lg font-semibold flex items-center justify-center text-sm gap-2 transition">
          <FaWhatsapp />
          ORDER VIA WHATSAPP
        </button>

        <button
          onClick={handleAddToCart}
          className="w-full border border-[#269ED9] text-[#269ED9] py-2 rounded-lg font-semibold flex items-center justify-center gap-2 hover:bg-[#269ED9] hover:text-white transition"
        >
          <ShoppingCart /> ADD TO CART
        </button>
      </div>

      {/* Modal */}
      {isCartModalOpen && (
        // <AddToCartModal product={product} onClose={closeModal} />

        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
          <div className="bg-white rounded-xl w-full max-w-md p-6 relative">
            <button
              onClick={() => setIsCartModalOpen(false)}
              className="absolute top-3 right-3 text-gray-500 hover:text-black"
            >
              ✕
            </button>

            <h2 className="text-lg font-semibold mb-2">
              Product added to cart
            </h2>

            <p className="text-sm text-gray-600 mb-4">{product.title}</p>
            <div>
              <ProductVariant variants={product.variants} from={from} />
            </div>

            <div className="flex gap-3">
              <button
                onClick={() => setIsCartModalOpen(false)}
                className="flex-1 border border-gray-300 py-2 rounded-lg text-sm hover:bg-gray-100"
              >
                Continue Shopping
              </button>

              <button className="flex-1 bg-[#269ED9] text-white py-2 rounded-lg text-sm hover:bg-[#1d82b5]">
                Go to Cart
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
