"use client";

import { useForm } from "react-hook-form";
import { useEffect } from "react";
import { slugify } from "@/utils/slugify";
import { addCategories } from "@/lib/categories";

export interface CategoryFormData {
  name: string;
  slug: string;
  isActive: boolean;
  order: number;
}

export default function AddCategoryForm() {
  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<CategoryFormData>({
    defaultValues: {
      name: "",
      slug: "",
      isActive: true,
      order: 1,
    },
  });

  const nameValue = watch("name");

  // 🔥 Auto-generate slug from name
  useEffect(() => {
    if (nameValue) {
      setValue("slug", slugify(nameValue));
    }
  }, [nameValue, setValue]);

  const onSubmit = async (data: CategoryFormData) => {
    try {
      const result = await addCategories(data);

      if (!result) {
        throw new Error("Failed to create category");
      }

      console.log(result);

      alert(result.message);
      reset();
    } catch (error) {
      console.error(error);
      alert("Something went wrong ❌");
    }
  };

  return (
    <div className="min-h-[60vh] flex justify-center items-center">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="min-w-md space-y-4 rounded-md p-6 bg-white"
      >
        <h2 className="text-xl font-semibold">Add Category</h2>

        {/* Category Name */}
        <div>
          <label className="block text-sm font-medium">Category Name</label>
          <input
            {...register("name", {
              required: "Category name is required",
              minLength: {
                value: 3,
                message: "Minimum 3 characters",
              },
            })}
            className="mt-1 w-full rounded border border-[#0970B4] px-3 py-2 
             outline-none focus:ring-0 focus:border-2 focus:border-[#0498fa]"
            placeholder="Winter Items"
          />
          {errors.name && (
            <p className="text-sm text-red-500">{errors.name.message}</p>
          )}
        </div>

        {/* Slug */}
        <div>
          <label className="block text-sm font-medium">Slug (auto)</label>
          <input
            {...register("slug", {
              required: "Slug is required",
            })}
            className="mt-1 w-full rounded border border-[#0970B4] px-3 py-2 
             outline-none focus:ring-0 focus:border-2 focus:border-[#0498fa]"
            readOnly
          />
        </div>
        {/* order */}
        <div>
          <label className="block text-sm font-medium">Category Order</label>
          <input
            {...register("order", {
              required: "order is required",
            })}
            className="mt-1 w-full rounded border border-[#0970B4] px-3 py-2 
             outline-none focus:ring-0 focus:border-2 focus:border-[#0498fa]"
            placeholder="Items Order"
            type="number"
          />
          {errors.order && (
            <p className="text-sm text-red-500">{errors.order.message}</p>
          )}
        </div>

        {/* Active */}
        <div className="flex items-center gap-2">
          <input
            type="checkbox"
            {...register("isActive")}
            className="h-4 w-4"
          />
          <label className="text-sm">Active</label>
        </div>

        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full rounded bg-[#0970B4] py-2 text-white hover:bg-[#065a92] disabled:opacity-50"
        >
          {isSubmitting ? "Saving..." : "Add Category"}
        </button>
      </form>
    </div>
  );
}
