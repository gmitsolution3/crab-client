//get product by slug
export const getProductDetails = async (slug: string) => {
  const res = await fetch(
    `${process.env.NEXT_EXPRESS_SERVER_BASE_URL}/api/products/${slug}`,
    {
      next: {
        tags: ["productDetails"],
        revalidate: 300,
      },
    }
  );

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
  const res = await fetch(
    `${process.env.NEXT_EXPRESS_SERVER_BASE_URL}/api/products?sku=${sku}`,
    {
      cache: "no-store",
    }
  );
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
    `${process.env.NEXT_EXPRESS_SERVER_BASE_URL}/get-product-by-category/${category}`,
    {
      next: { revalidate: 300 },
    }
  );

  return res.json();
}

// all category
export async function AllProduct() {
  const res = await fetch(
    `${process.env.NEXT_EXPRESS_SERVER_BASE_URL}/api/products`,
    {
      next: { revalidate: 300 },
    }
  );

  return res.json();
}

export async function getDraftProduct() {
  const res = await fetch(
    `${process.env.NEXT_EXPRESS_SERVER_BASE_URL}/api/products/draft`,
    {
      next: { revalidate: 300 },
    }
  );

  return res.json();
}

export async function getDeletedProduct() {
  const res = await fetch(
    `${process.env.NEXT_EXPRESS_SERVER_BASE_URL}/api/products/delete-product`,
    {
      next: { revalidate: 300 },
    }
  );

  return res.json();
}

export async function getFeaturedProduct() {
  const res = await fetch(
    `${process.env.NEXT_EXPRESS_SERVER_BASE_URL}/api/products/featured`,
    {
      next: { revalidate: 300 },
    }
  );

  return res.json();
}
