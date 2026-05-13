import { getTopSellingProduct } from "@/lib/products";
import ProductCarousel from "./productCarousel";

export const TopSellingProduct = async () => {
  const product = await getTopSellingProduct();
  const topSelling = "formTopSelling";

  return (
    <div>
      <ProductCarousel
        products={product.data}
        topSelling={topSelling}
      />
    </div>
  );
};
