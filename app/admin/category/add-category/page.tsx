"use client";

import { useForm, useFieldArray } from "react-hook-form";
import { useEffect } from "react";
import { slugify } from "@/utils/slugify";
import { addCategories } from "@/lib/categories";
import { Trash2, Plus, LayoutGrid } from "lucide-react";


export interface SubCategory {
  id?: string;
  name: string;
  slug: string;
  isActive: boolean;
}

export interface CategoryFormData {
  name: string;
  slug: string;
  isActive: boolean;
  order: number;
  subCategories: { name: string; isActive: boolean }[]; 
}

export default function AddCategoryForm() {
  const {
    register,
    handleSubmit,
    watch,
    setValue,
    control,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<CategoryFormData>({
    defaultValues: {
      name: "",
      slug: "",
      isActive: true,
      order: 1,
      subCategories: [{ name: "", isActive: true }],
    },
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: "subCategories",
  });

  const nameValue = watch("name");

  
  useEffect(() => {
    if (nameValue) {
      setValue("slug", slugify(nameValue));
    }
  }, [nameValue, setValue]);

  const onSubmit = async (data: CategoryFormData) => {
    try {
      
      const finalPayload = {
        ...data,
        order: Number(data.order),
        subCategories: data.subCategories
          .filter((sub) => sub.name.trim() !== "")
          .map((sub) => ({
            name: sub.name,
            slug: slugify(sub.name), 
            isActive: sub.isActive,
            id: crypto.randomUUID(), 
          })),
      };

      const result = await addCategories(finalPayload);

      if (result) {
        alert("Category & Subcategories added successfully! 🎉");
        reset();
      }
    } catch (error) {
      console.error("Submission Error:", error);
      alert("Failed to save. Please try again.");
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex justify-center items-start py-12 px-4">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="w-full max-w-2xl space-y-6 rounded-xl border bg-white p-8 shadow-sm"
      >
        <div className="flex items-center gap-2 border-b pb-4 text-[#0970B4]">
          <LayoutGrid size={24} />
          <h2 className="text-2xl font-bold">Add New Category</h2>
        </div>

        {/* Main Category Info */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="text-sm font-semibold text-gray-700">
              Category Name
            </label>
            <input
              {...register("name", { required: "Name is required" })}
              className="mt-1 w-full rounded-lg border border-gray-300 px-4 py-2 outline-none focus:border-2 focus:border-[#0970B4] transition-all"
              placeholder="e.g. Electronics"
            />
            {errors.name && (
              <p className="mt-1 text-xs text-red-500">{errors.name.message}</p>
            )}
          </div>

          <div>
            <label className="text-sm font-semibold text-gray-700">
              Slug (Auto)
            </label>
            <input
              {...register("slug")}
              readOnly
              className="mt-1 w-full rounded-lg border border-gray-100 bg-gray-50 px-4 py-2 text-gray-500 outline-none"
            />
          </div>
        </div>

        {/* Subcategories Dynamic Section */}
        <div className="rounded-lg border bg-gray-50/50 p-4">
          <label className="mb-3 block text-sm font-bold text-gray-700 uppercase tracking-wider">
            Sub-Categories
          </label>

          <div className="space-y-3">
            {fields.map((field, index) => (
              <div
                key={field.id}
                className="flex flex-wrap md:flex-nowrap gap-3 items-center bg-white p-3 rounded-md shadow-sm border border-gray-200"
              >
                <div className="flex-1">
                  <input
                    {...register(`subCategories.${index}.name` as const, {
                      required: true,
                    })}
                    placeholder="Subcategory Name"
                    className="w-full rounded border-none bg-transparent px-2 py-1 outline-none focus:ring-0 text-sm"
                  />
                </div>

                <div className="flex items-center gap-2 border-l pl-3">
                  <input
                    type="checkbox"
                    {...register(`subCategories.${index}.isActive` as const)}
                    className="h-4 w-4 rounded border-gray-300 text-[#0970B4] focus:ring-[#0970B4]"
                  />
                  <span className="text-xs text-gray-500 font-medium">
                    Active
                  </span>
                </div>

                <button
                  type="button"
                  onClick={() => remove(index)}
                  className="rounded-full p-1.5 text-gray-400 hover:bg-red-50 hover:text-red-500 transition-colors"
                >
                  <Trash2 size={16} />
                </button>
              </div>
            ))}
          </div>

          <button
            type="button"
            onClick={() => append({ name: "", isActive: true })}
            className="mt-4 flex items-center gap-2 text-sm font-bold text-[#0970B4] hover:text-[#074a77] transition-colors"
          >
            <Plus size={18} className="rounded-full border border-[#0970B4]" />
            Add Another Sub-Category
          </button>
        </div>

        {/* Global Settings */}
        <div className="flex flex-wrap items-center justify-between gap-4 border-t pt-6">
          <div className="flex items-center gap-6">
            <div className="w-24">
              <label className="text-xs font-bold text-gray-500 uppercase">
                Sort Order
              </label>
              <input
                type="number"
                {...register("order")}
                className="w-full rounded border-gray-300 py-1 text-sm outline-none focus:border-[#0970B4]"
              />
            </div>

            <div className="flex items-center gap-2 mt-4">
              <input
                type="checkbox"
                id="mainActive"
                {...register("isActive")}
                className="h-5 w-5 rounded border-gray-300 text-[#0970B4] focus:ring-[#0970B4]"
              />
              <label
                htmlFor="mainActive"
                className="text-sm font-bold text-gray-700"
              >
                Category Published
              </label>
            </div>
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className="min-w-37.5 rounded-lg bg-[#0970B4] px-6 py-3 font-bold text-white shadow-md hover:bg-[#065a92] disabled:opacity-50 transition-all active:scale-95"
          >
            {isSubmitting ? "Processing..." : "Save Category"}
          </button>
        </div>
      </form>
    </div>
  );
}