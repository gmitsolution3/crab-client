import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

interface PaymentAnalyticsProps {
  analytics: {
    totalOrders?: number;
    totalGrandTotal?: number;
    pending?: number;
    processing?: number;
    courier?: number;
    onHold?: number;
    cancelled?: number;
    returned?: number;
    completed?: number;
    totalPaidOrders?: number;
    totalPaidAmount?: number;
    totalDueOrders?: number;
    totalDueAmount?: number;
    firstOrderDate?: string;
    lastOrderDate?: string;
  } | null;
}

export function PaymentAnalytics({ analytics }: PaymentAnalyticsProps) {
  if (!analytics) return null;

  const stats = [
    {
      label: "Pending Orders",
      value: analytics.pending || 0,
      color: "bg-amber-100 text-amber-900",
    },
    {
      label: "Processing",
      value: analytics.processing || 0,
      color: "bg-blue-100 text-blue-900",
    },
    {
      label: "In Courier",
      value: analytics.courier || 0,
      color: "bg-purple-100 text-purple-900",
    },
    {
      label: "Completed",
      value: analytics.completed || 0,
      color: "bg-green-100 text-green-900",
    },
    {
      label: "On Hold",
      value: analytics.onHold || 0,
      color: "bg-gray-100 text-gray-900",
    },
    {
      label: "Cancelled",
      value: analytics.cancelled || 0,
      color: "bg-red-100 text-red-900",
    },
  ];

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg">Order Details</CardTitle>
        <CardDescription>Breakdown by order status</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
          {stats.map((stat) => (
            <div key={stat.label} className={`p-4 rounded-lg ${stat.color}`}>
              <p className="text-xs font-medium opacity-75">{stat.label}</p>
              <p className="text-2xl font-bold">{stat.value}</p>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
