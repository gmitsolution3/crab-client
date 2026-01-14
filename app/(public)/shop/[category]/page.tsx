import { getProductByCategory } from "@/lib/products";
import React from "react";
import { ProductCard } from "../components/productCard";

interface ProductCategoryProps {
  params: {
    category: string;
  };
}

const Categories = async ({ params }: ProductCategoryProps) => {
  const { category } = await params;

  const products = await getProductByCategory(category);

   if (!products || !products.data.length) {
     return (
       <div className="text-2xl text-[#0970B4] flex justify-center min-h-screen items-center">
         No Data found
       </div>
     );
   }


  return (
    <div className="max-w-7xl mx-auto my-20">
      <div className="my-5">
          <h1 className="text-4xl font-bold pl-4">All Product</h1>
          <p className="text-sm pl-4 text-gray-700">
            We provide our best quality
          </p>
        </div>
      <div>
        <ProductCard products={products.data} />
      </div>
    </div>
  );
};

export default Categories;
