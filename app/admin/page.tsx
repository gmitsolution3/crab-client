// import { MainDashboardAnalytics } from "@/lib/order";
// import Dashboard from "./components/adminMainDashboard";
// import { cookies } from "next/headers";
// import { redirect } from "next/navigation";
// import jwt from "jsonwebtoken";

// export default async function AdminDashboard() {
//   const result = await MainDashboardAnalytics();
//   const cookieStore = await cookies();
//   const token = cookieStore.get("token")?.value;

//   console.log(token);

//   if (!token) {
//     redirect("/auth/sign-in");
//   }

//   let decoded: any;

//   try {
//     decoded = jwt.verify(token, process.env.JWT_SECRET!);
//   } catch (err: any) {
//     redirect("/auth/sign-in");
//   }

//   console.log(decoded.role)

//   if (decoded.role?.toLowerCase() !== "admin") {
//     console.log("Role mismatch, actual:", decoded.role);
//     redirect("/auth/sign-in");
//   }

//   return (
//     <div>
//       <Dashboard result={result.data} />
//     </div>
//   );
// }

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
