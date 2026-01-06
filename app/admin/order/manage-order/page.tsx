import type { Metadata } from "next";
import ManageOrders from "../components/ManageOrders";

export const metadata: Metadata = {
  title: "Manage Orders",
  description: "Manage and track all customer orders",
};

export default function ManageOrdersPage() {
  return (
    <div className="min-h-screen p-4 md:p-8">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl font-bold mb-2">Manage Orders</h1>
        <p className="text-muted-foreground mb-6">
          View, filter, and manage all customer orders
        </p>
        <ManageOrders />
      </div>
    </div>
  );
}
