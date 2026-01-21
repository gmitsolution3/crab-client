import type { Metadata } from "next";
import ManageOrders from "../components/ManageOrders";
import { getAllOrder } from "@/lib/order";

export const metadata: Metadata = {
  title: "Manage Orders",
  description: "Manage and track all customer orders",
};

export default async function ManageOrdersPage() {
  const response = await getAllOrder();

  if (!response.data.length) {
    return (
      <div className="min-h-screen text-2xl text-primary flex justify-center items-center">
        No Order found
      </div>
    );
  }

  return (
    <div className="min-h-screen p-4 md:p-8">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl font-bold mb-2">Manage Orders</h1>
        <p className="text-muted-foreground mb-6">
          View, filter, and manage all customer orders
        </p>
        <ManageOrders MOCK_ORDERS={response.data} />
      </div>
    </div>
  );
}
