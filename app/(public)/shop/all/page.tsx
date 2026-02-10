import { AllProduct, getFeaturedProduct } from "@/lib/products";
import React from "react";
import ProductCarousel from "@/app/components/productCarousel";
import ProductCard from "../components/productCard";
import { ProductFormData } from "@/utils/product";

const ShowAllProduct = async () => {
  const res = await AllProduct();
  const result = await getFeaturedProduct();
  const products = res.data;

  if (products.length === 0) {
    return (
      <div className="min-h-screen flex justify-center items-center text-3xl text-blue-800">
        no data found
      </div>
    );
  }

  if (result.data.length === 0) {
    return (
      <div>
        <h2 className="text-2xl font-semibold mb-4">Featured Products</h2>
        <p className="text-gray-600">No featured products available.</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen max-w-7xl mx-auto my-10">
      <div className="my-5">
        <h1 className="text-4xl font-bold pl-4">All Product</h1>
        <p className="text-sm pl-4 text-gray-700">
          We provide our best quality
        </p>
      </div>
      <div className="grid grid-cols-4 gap-5 space-y-10">
        {products.map((p: ProductFormData) => (
          <div key={p._id}>
            <ProductCard product={p} />
          </div>
        ))}
      </div>
      <div>
        <div>
          <ProductCarousel products={result.data} />
        </div>
      </div>
    </div>
  );
};

export default ShowAllProduct;
