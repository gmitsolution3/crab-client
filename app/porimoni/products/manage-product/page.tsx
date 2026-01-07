import { AllProduct } from "@/lib/products";
import React from "react";
import ProductTable from "../components/allProduct";

const ManageProducts = async () => {
  const res = await AllProduct();
  const products = res.data;

  if (products.length === 0) {
    return (
      <div className="text-4xl text-blue-700 min-h-screen flex justify-center items-center">
        no product found
      </div>
    );
  }

  const productDescription = {
    title: "Manage Product",
    subTitle: "Manage your product inventory",
  };

  return (
    <div>
      <ProductTable
        INITIAL_PRODUCTS={products}
        description={productDescription}
      />
    </div>
  );
};

export default ManageProducts;
