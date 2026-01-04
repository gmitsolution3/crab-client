export const getProductDetails = async (slug: string) => {
  const res = await fetch(`http://localhost:5000/api/products/${slug}`, {
    next: {
      tags: ["productDetails"],
      revalidate: 300, //catch for 5 mini
    },
  });

  if (!res.ok) {
    return {
      success: false,
      massage: "Something is wrong",
      data: await res.json(),
    };
  }

  const result = await res.json();

  return result;
};

export const getProductBySKU = async (sku: string) => {
  const res = await fetch(`http://localhost:5000/api/products?sku=${sku}`, {
    cache: "no-store",
  });
  if (!res.ok) {
    return {
      success: false,
      massage: "Something is wrong",
      data: await res.json(),
    };
  }

  const result = await res.json();

  return result;
};


export async function getProductByCategory(category: string) {
  const res = await fetch(
    `http://localhost:5000/get-product-by-category/${category}`,
    {
      next: { revalidate: 300 },
    }
  );

  return res.json();
}
