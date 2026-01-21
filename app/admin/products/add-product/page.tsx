import React from "react";
import AddProductForm from "../components/AddProduct";
import { getCategories } from "@/lib/categories";

const AddProduct = async () => {
  const category = await getCategories();

  if (!category || !category.data) {
    return (
      <div className="flex flex-col min-h-screen justify-center items-center">
        <h1 className="text-2xl">Category is require</h1>
        <p className="text-3xl text-primary">No Category found</p>
      </div>
    );
  }

  return (
    <div>
      <AddProductForm allCategory={category.data} />
    </div>
  );
};

export default AddProduct;
