import React from "react";
import OrderDetailsPage from "../../components/editOrder";
import { getOrderById } from "@/lib/order";

interface ParamsProps {
  params: {
    id: string;
  };
}

const EditOrder =async ({ params }:ParamsProps) => {

    const {id} = await params

  const result = await getOrderById(id);

  return (
    <div>
      <OrderDetailsPage orderData={result.data}/>
    </div>
  );
};

export default EditOrder;
