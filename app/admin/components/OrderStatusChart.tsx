import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export function OrderStatusChart() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Order Status</CardTitle>
        <CardDescription>Current order distribution</CardDescription>
      </CardHeader>
      <CardContent>{/* Chart will be rendered in main page */}</CardContent>
    </Card>
  );
}
