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
