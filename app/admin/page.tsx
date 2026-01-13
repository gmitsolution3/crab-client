"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Dashboard from "./components/adminMainDashboard";
import { MainDashboardAnalytics } from "@/lib/order";
import { useAuth } from "../context/AuthContext";
import { ServicesSkeleton } from "../components/skeleton/ServicesSkeleton";

export default function AdminDashboard() {
  const router = useRouter();
  const { user, loading } = useAuth();

  const [data, setData] = useState<any>(null);
  const [pageLoading, setPageLoading] = useState(true);

  useEffect(() => {
    if (!loading) {
      if (!user || user.role?.toLowerCase() !== "admin") {
        router.replace("/auth/sign-in");
        return;
      }

      const loadData = async () => {
        try {
          const result = await MainDashboardAnalytics();
          console.log({result:result})

          setData(result.data);
        } catch (err) {
          console.error("Dashboard load failed", err);
        } finally {
          setPageLoading(false);
        }
      };

      loadData();
    }
  }, [user, loading, router]);

  if (loading || pageLoading) {
    return (
      <div>
        <ServicesSkeleton />
      </div>
    );
  }

  return (
    <div>
      <Dashboard result={data} />
    </div>
  );
}
