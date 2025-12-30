import { ProductFormData } from "@/utils/product";
import Image from "next/image";
import React from "react";
import ProductVariants from "./ProductVariants";

interface ProductDetailsProps {
  product: ProductFormData;
}

export const ProductDetail = ({ product }: ProductDetailsProps) => {

  const from = "productDetails"
  return (
    <div className="space-y-10">
      <div className="flex flex-col md:flex-row gap-10">
        <div className="max-w-67.75 w-full ">
          <div>
            <Image
              src={`${product.thumbnail}`}
              alt={`${product.title}`}
              width={271}
              height={253}
              // placeholder="blur"
              // blurDataURL={`${product.thumbnail}`}
              className="object-cover rounded"
            />
          </div>
          <div className="flex gap-2 mt-4">
            {product.gallery.map((img, index) => (
              <Image
                key={index}
                src={`${img}`}
                alt={`${product.title}`}
                width={63}
                height={68}
                className="object-cover rounded"
              />
            ))}
          </div>
        </div>
        <div className="space-y-4">
          <h1 className="text-2xl text-black font-bold">{product.title}</h1>
          <div className="flex items-center gap-2">
            <span className="text-2xl font-bold text-gray-900">
              {product.discount.type === "percentage"
                ? Math.floor(
                    Number(product.basePrice) -
                      (Number(product.basePrice) *
                        Number(product.discount.value)) /
                        100
                  )
                : Math.max(
                    Number(product.basePrice) - Number(product.discount.value),
                    0
                  )}
              ৳
            </span>
            <span className="text-lg text-red-500 line-through ml-2">
              {product.basePrice}৳
            </span>
          </div>
          <div>
            <p>{product.shortDescription}</p>
            <div className="mt-4">
              <ProductVariants variants={product.variants} from={from} />
            </div>
          </div>
        </div>
      </div>

      <div>
        <h1 className="text-4xl font-bold text-[#0970B4] mb-2">Description</h1>
        <p>{product.description}</p>
      </div>
    </div>
  );
};
