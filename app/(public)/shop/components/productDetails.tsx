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



  const cleanHTML = product.description.replace(/<p>\s*<\/p>/g, "");

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
          <h1 className="text-2xl text-primary font-bold">{product.title}</h1>
          <div>
            <p>{product.shortDescription}</p>
            <div className="mt-4">
              <ProductVariants
                variants={product.variants}
                product= {product}
                from={from}
                productDetails={productDetails}
              />
            </div>
          </div>
        </div>
      </div>

      <div className="px-5 pb-10 mb-20">
        <h1 className="text-4xl font-bold text-primary mb-2">Description</h1>
        <div
          className="prose prose-lg max-w-none
             prose-p:my-3
             prose-h1:my-4
             prose-h2:my-3
             prose-h3:my-3
             prose-li:my-1"
          dangerouslySetInnerHTML={{ __html: cleanHTML }}
        />
      </div>
      {/* <div className="px-5 pb-10 mb-20">
        <YouTubeVideoPlayer
          videoUrl="https://youtu.be/myJ7x029Ves?si=Xmd-zZiwf1TglrhD"
          thumbnail="https://i.postimg.cc/BQBxkN2C/maxresdefault.jpg"
        />
      </div> */}
    </div>
  );
};
