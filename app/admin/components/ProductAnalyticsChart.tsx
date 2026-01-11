import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

interface Product {
  _id: string;
  totalQuantitySold: number;
  totalSalesAmount: number;
  categoryName: string;
  productTitle: string;
  productSlug: string;
  productThumbnail: string;
}

interface ProductAnalyticsChartProps {
  products: Product[];
}

export function ProductAnalyticsChart({
  products,
}: ProductAnalyticsChartProps) {
  // Prepare data for the chart
  const chartData = products.slice(0, 5).map((product) => ({
    name:
      product.productTitle.substring(0, 15) +
      (product.productTitle.length > 15 ? "..." : ""),
    quantity: product.totalQuantitySold,
    sales: product.totalSalesAmount,
  }));

  return (
    <Card className="mb-8">
      <CardHeader>
        <CardTitle className="text-lg">Product Performance</CardTitle>
        <CardDescription>Top products by sales and quantity</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="h-80">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={chartData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis yAxisId="left" />
              <YAxis yAxisId="right" orientation="right" />
              <Tooltip
                contentStyle={{
                  backgroundColor: "var(--card)",
                  border: "1px solid var(--border)",
                  borderRadius: "8px",
                }}
              />
              <Legend />
              <Bar
                yAxisId="left"
                dataKey="quantity"
                fill="#3b82f6"
                name="Quantity Sold"
              />
              <Bar
                yAxisId="right"
                dataKey="sales"
                fill="#10b981"
                name="Sales ($)"
              />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
}
