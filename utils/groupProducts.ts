import { ProductFormData } from "@/utils/product";

interface GroupedProducts {
  [categoryName: string]: ProductFormData[];
}

export const groupProducts = (
  products: ProductFormData[],
): GroupedProducts => {
  return products.reduce((acc, product) => {
    const category = product.category;

    if (!acc[category]) {
      acc[category] = [];
    }

    acc[category].push(product);

    return acc;
  }, {} as GroupedProducts);
};