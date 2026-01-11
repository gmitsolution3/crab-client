import { MainDashboardAnalytics } from "@/lib/order";
import { AnalyticsDashboard } from "./components/adminDashboard";
import Dashboard from "./components/adminMainDashboard";

export default async function AdminDashboard() {

  const result = await MainDashboardAnalytics();

 

  return (
    <div>
      {/* <AnalyticsDashboard /> */}
      <Dashboard result={result.data} />
    </div>
  );
}
