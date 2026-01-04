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
  return (
    <div>
      <ProductCard products={products.data} />
    </div>
  );
};

export default Categories;
