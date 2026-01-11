import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

interface RevenueOverTimeProps {
  analytics: {
    totalGrandTotal?: number;
    totalPaidAmount?: number;
    totalDueAmount?: number;
  } | null;
}

export function RevenueOverTime({ analytics }: RevenueOverTimeProps) {
  // Sample data - replace with actual historical data from your API
  const data = [
    { month: "Jan", totalRevenue: 4000, targetRevenue: 3500 },
    { month: "Feb", totalRevenue: 5200, targetRevenue: 4000 },
    { month: "Mar", totalRevenue: 4800, targetRevenue: 4500 },
    { month: "Apr", totalRevenue: 6300, targetRevenue: 5500 },
    { month: "May", totalRevenue: 7100, targetRevenue: 6000 },
    { month: "Jun", totalRevenue: 8200, targetRevenue: 7000 },
    { month: "Jul", totalRevenue: 9100, targetRevenue: 8500 },
    { month: "Aug", totalRevenue: 10200, targetRevenue: 9000 },
  ];

  return (
    <Card className="mb-8">
      <CardHeader>
        <CardTitle className="text-lg">Revenue Over Time</CardTitle>
        <CardDescription>Monthly revenue vs target</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="h-80">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={data}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip
                contentStyle={{
                  backgroundColor: "var(--card)",
                  border: "1px solid var(--border)",
                  borderRadius: "8px",
                }}
              />
              <Legend />
              <Line
                type="monotone"
                dataKey="totalRevenue"
                stroke="#0ea5e9"
                strokeWidth={2}
                dot={{ fill: "#0ea5e9", r: 4 }}
                activeDot={{ r: 6 }}
                name="Total Revenue"
              />
              <Line
                type="monotone"
                dataKey="targetRevenue"
                stroke="#f59e0b"
                strokeWidth={2}
                dot={{ fill: "#f59e0b", r: 4 }}
                activeDot={{ r: 6 }}
                name="Target Revenue"
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
}
