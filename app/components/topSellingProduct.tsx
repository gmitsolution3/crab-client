import ProductCarousel from "./productCarousel";

export const TopSellingProduct = async ({
  topSellingProducts,
}: {
  topSellingProducts: any;
}) => {
  const topSelling = "formTopSelling";

  return (
    <div>
      <ProductCarousel
        products={topSellingProducts}
        topSelling={topSelling}
      />
    </div>
  );
};
