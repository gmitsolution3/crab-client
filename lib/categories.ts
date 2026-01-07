import { CategoryFormData } from "@/app/admin/category/add-category/page";

// lib/getCategories.ts
export async function getCategories() {
  const res = await fetch(
    `${process.env.NEXT_EXPRESS_SERVER_BASE_URL}/create-category`,
    {
      next: { revalidate: 300 }, // 5 minutes cache
    }
  );

  return res.json();
}

export async function addCategories(data: CategoryFormData) {
  const res = await fetch(
    `${process.env.NEXT_EXPRESS_SERVER_BASE_URL}/create-category`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    }
  );

  return res.json();
}
