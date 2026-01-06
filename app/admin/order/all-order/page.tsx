import { getAllOrder } from "@/lib/order";
import React from "react";
import AllProductTable from "../components/AllProductTable";
const AllOrder = async () => {
  const res = await getAllOrder();

  const result = res.data;


  return (
    <div>
      <AllProductTable INITIAL_ORDERS={result}/>
    </div>
  );
};

export default AllOrder;
