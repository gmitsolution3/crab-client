import { ProductFormData } from "@/utils/product";
import { ShoppingCart } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import { FaWhatsapp } from "react-icons/fa";
import { CardButtons } from "./cardButtons";

interface Product {
  products: ProductFormData[];
}

export const ProductCard = ({ products }: Product) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4">
      {products.map((pro: ProductFormData, index: number) => (
        <div className="rounded-xl border border-gray-200 bg-white hover:shadow-lg overflow-hidden hover:border hover:border-blue-700 hover:cursor-pointer">
          <Link href={`/shop/${pro.categoryId}/${pro.slug}`} key={index}>
            <div>
              <div className="relative bg-linear-to-br from-gray-900 to-gray-700 p-4 h-56">
                <Image
                  src={typeof pro.thumbnail === "string" ? pro.thumbnail : ""}
                  alt={pro.title}
                  fill
                  priority
                  className="object-cover"
                />
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
                            (Number(pro.basePrice) *
                              Number(pro.discount.value)) /
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
              </div>
            </div>
          </Link>
          <div className="p-3">
            <CardButtons product={pro} />
          </div>
        </div>
      ))}
    </div>
  );
};
