//get product by slug
export const getProductDetails = async (slug: string) => {
  const res = await fetch(
    `${process.env.NEXT_EXPRESS_SERVER_BASE_URL}/api/products/${slug}`,
    {
      next: {
        tags: ["productDetails"],
        revalidate: 60,
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

// get top selling product

export const getTopSellingProduct = async()=>{
  const res = await fetch(
    `${process.env.NEXT_EXPRESS_SERVER_BASE_URL}/api/products/get-top-selling-product`,{
      cache: "no-store"
    }
  );

  return res.json();
}

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
      cache: "no-store",
    }
  );

  return res.json();
}

// all category
export async function AllProduct() {
  const res = await fetch(
    `${process.env.NEXT_EXPRESS_SERVER_BASE_URL}/api/products`,
    {
      cache: "no-store",
    },
  );

  return res.json();
}

export async function getDraftProduct() {
  const res = await fetch(
    `${process.env.NEXT_EXPRESS_SERVER_BASE_URL}/api/products/draft`,
    {
      cache: "no-cache",
    },
  );

  return res.json();
}

export async function getDeletedProduct() {
  const res = await fetch(
    `${process.env.NEXT_EXPRESS_SERVER_BASE_URL}/api/products/delete-product`,
    {
      cache: "no-cache",
    },
  );

  return res.json();
}

export async function getFeaturedProduct() {
  const res = await fetch(
    `${process.env.NEXT_EXPRESS_SERVER_BASE_URL}/api/products/featured`,
    {
      cache: "no-cache",
    }
  );

  return res.json();
}
