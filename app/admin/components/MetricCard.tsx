import { Card, CardContent } from "@/components/ui/card";

interface MetricCardProps {
  title: string;
  value: string | number;
  description: string;
  trend?: number | null;
}

export function MetricCard({
  title,
  value,
  description,
  trend,
}: MetricCardProps) {
  return (
    <Card>
      <CardContent className="pt-6">
        <div className="space-y-2">
          <p className="text-sm text-muted-foreground">{title}</p>
          <p className="text-2xl sm:text-3xl font-bold text-foreground">
            {value}
          </p>
          <p className="text-xs text-muted-foreground">{description}</p>
        </div>
      </CardContent>
    </Card>
  );
}
