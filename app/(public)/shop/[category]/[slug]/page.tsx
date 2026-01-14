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

  if (!result || !result.data.length) {
    return (
      <div className="text-2xl text-[#0970B4] flex justify-center min-h-screen items-center">
        No Data found
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      <ProductDetail product={result.data} />
    </div>
  );
};

export default ProductDetails;
