import { getAllOrder } from "@/lib/order";
import React from "react";
import AllProductTable from "../components/AllProductTable";
const AllOrder = async () => {
  const res = await getAllOrder();

  const result = res.data;

  if (!result.length) {
    return (
      <div className="min-h-screen text-2xl text-primary flex justify-center items-center">
        No Order found
      </div>
    );
  }

  return (
    <div>
      <AllProductTable INITIAL_ORDERS={result} />
    </div>
  );
};

export default AllOrder;
