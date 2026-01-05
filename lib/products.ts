
//get product by slug
export const getProductDetails = async (slug: string) => {
  const res = await fetch(`http://localhost:5000/api/products/${slug}`, {
    next: {
      tags: ["productDetails"],
      revalidate: 300, 
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

// product by sku
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


// product by category

export async function getProductByCategory(category: string) {
  const res = await fetch(
    `http://localhost:5000/get-product-by-category/${category}`,
    {
      next: { revalidate: 300 },
    }
  );

  return res.json();
}

// all category
export async function AllProduct() {
  const res = await fetch("http://localhost:5000/api/products", {
    next: { revalidate: 300 },
  });

  return res.json()

}
