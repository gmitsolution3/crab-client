import { getHistory } from "@/lib/order";
import React from "react";
import OrderHistoryCard from "../../components/OrderHistoryCard";

interface ParamsProps {
  params: {
    id: string;
  };
}

const History = async ({ params }: ParamsProps) => {
  const { id } = await params;

  const result = await getHistory(id);

  if (!result?.success) {
    return (
      <div className="min-h-screen flex justify-center items-center text-primary">
        No history found
      </div>
    );
  }

  return (
    <div className="space-y-10">
      {result.data.map((item: any) => (
        <OrderHistoryCard key={item._id} data={item} />
      ))}
    </div>
  );
};

export default History;
