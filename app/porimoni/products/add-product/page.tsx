import React from "react";
import AddProductForm from "../components/AddProduct";
import { getCategories } from "@/lib/categories";

const AddProduct =async () => {
  const category = await getCategories();

  return (
    <div>
      <AddProductForm allCategory={category.data} />
    </div>
  );
};

export default AddProduct;
