import type { Metadata } from "next";
import { AdminSidebar } from "./components/AdminSidebar";
import { AdminHeader } from "./components/AdminHeader";

export const metadata: Metadata = {
  title: "Admin Dashboard",
  description: "Admin panel",
};

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen flex bg-gray-100">
      {/* Sidebar */}
      <AdminSidebar />

      {/* Main content */}
      <div className="flex-1 flex flex-col">
        <AdminHeader />

        <main className="p-6">{children}</main>
      </div>
    </div>
  );
}
