import { ProductFormData } from "@/utils/product";
import Image from "next/image";
import React from "react";
import ProductVariants from "./ProductVariants";
import ProductImage from "./productImage";
import YouTubeVideoPlayer from "./youtubeVideoPlayer";

interface ProductDetailsProps {
  product: ProductFormData;
}

export const ProductDetail = ({ product }: ProductDetailsProps) => {
  const productPrice =
    product.discount.type === "percentage"
      ? Math.floor(
          Number(product.basePrice) -
            (Number(product.basePrice) * Number(product.discount.value)) / 100,
        )
      : Math.max(Number(product.basePrice) - Number(product.discount.value), 0);

  const { title, slug, thumbnail } = product;

  const productDetails = {
    productPrice,
    title,
    slug,
    thumbnail,
  };

  const from = "productDetails";
  return (
    <div className="space-y-10 max-w-7xl mx-auto">
      <div className="flex flex-col md:flex-row justify-center gap-10 mt-10 px-5">
        <div className="max-w-full md:max-w-80 w-full ">
          <ProductImage
            thumbnail={product.thumbnail}
            gallery={product.gallery}
            title={product.title}
          />
        </div>
        <div className="space-y-4">
          <h1 className="text-2xl text-black font-bold">{product.title}</h1>
          <div className="flex items-center gap-2">
            <span className="text-2xl font-bold text-gray-900">
              {productPrice}৳
            </span>
            <span className="text-lg text-red-500 line-through ml-2">
              {product.basePrice}৳
            </span>
          </div>
          <div>
            <p>{product.shortDescription}</p>
            <div className="mt-4">
              <ProductVariants
                variants={product.variants}
                from={from}
                productDetails={productDetails}
              />
            </div>
          </div>
        </div>
      </div>

      {/* <div>
        <YouTubeVideoPlayer
          videoUrl="https://youtu.be/myJ7x029Ves?si=Xmd-zZiwf1TglrhD"
          thumbnail="https://i.postimg.cc/BQBxkN2C/maxresdefault.jpg"
        />
      </div> */}

      <div className="px-5 pb-10 mb-20">
        <h1 className="text-4xl font-bold text-primary mb-2">Description</h1>
        <p>{product.description}</p>
      </div>
    </div>
  );
};
