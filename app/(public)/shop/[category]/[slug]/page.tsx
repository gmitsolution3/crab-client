import { getProductDetails } from "@/lib/products";
import React from "react";
import { ProductDetail } from "../../components/productDetails";

interface ProductPageProps {
  params: {
    slug: string;
  };
}

const ProductDetails = async ({ params }: ProductPageProps) => {
  const { slug } = await params;
  const result = await getProductDetails(slug);

  return (
    <div className="min-h-screen">
      <ProductDetail product={result.data}/>
    </div>
  );
};

export default ProductDetails;
