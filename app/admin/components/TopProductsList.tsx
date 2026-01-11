import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

interface Product {
  _id: string;
  totalQuantitySold: number;
  totalSalesAmount: number;
  categoryName: string;
  productTitle: string;
  productSlug: string;
  productThumbnail: string;
}

interface TopProductsListProps {
  products: Product[];
}

export function TopProductsList({ products }: TopProductsListProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg">Top Selling Products</CardTitle>
        <CardDescription>Your best performing products</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {products.slice(0, 5).map((product) => (
            <div
              key={product._id}
              className="flex items-center gap-4 pb-4 border-b border-border last:border-0"
            >
              <div className="relative w-12 h-12 rounded-lg overflow-hidden bg-muted shrink-0">
                <img
                  src={product.productThumbnail || "/placeholder.svg"}
                  alt={product.productTitle}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="flex-1 min-w-0">
                <h3 className="font-semibold text-sm truncate">
                  {product.productTitle}
                </h3>
                <p className="text-xs text-muted-foreground">
                  {product.categoryName}
                </p>
              </div>
              <div className="text-right shrink-0">
                <p className="font-semibold text-sm">
                  ${product.totalSalesAmount.toLocaleString()}
                </p>
                <p className="text-xs text-muted-foreground">
                  {product.totalQuantitySold} sold
                </p>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
