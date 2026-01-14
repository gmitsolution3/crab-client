import { getDraftProduct } from "@/lib/products";
import React from "react";
import ProductTable from "../components/allProduct";

export const DraftProducts = async () => {



  const res = await getDraftProduct();

  const result = res.data;

  

  const productDescription = {
    title: "Draft Product",
    subTitle: "Manage your draft product inventory",
  };

  if(!result || result.length === 0){
    return (
      <div className="flex flex-col min-h-screen justify-center items-center">
        <h2 className="text-2xl font-semibold mb-4">Draft Product</h2>
        <p className="text-2xl text-[#0970B4]">No draft products available.</p>
      </div>
    );
  }

  return (
    <div>
      <ProductTable
        INITIAL_PRODUCTS={result}
        description={productDescription}
      />
    </div>
  );
};

export default DraftProducts;
