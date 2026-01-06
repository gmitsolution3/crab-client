import { getFeaturedProduct } from "@/lib/products";
import React from "react";
import ProductCarousel from "./productCarousel";

export const FeaturedProduct = async () => {
  const result = await getFeaturedProduct();

  console.log("fetcher section", result);

  return (
    <div>
      <ProductCarousel products={result.data}/>
    </div>
  );
};
