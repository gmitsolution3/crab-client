"use client";

import { useForm, useFieldArray } from "react-hook-form";
import { useEffect, useState } from "react";
import { slugify } from "@/utils/slugify";
import { addCategories } from "@/lib/categories";
import { Trash2, Plus, LayoutGrid } from "lucide-react";
import { ImagePlus } from "lucide-react";
import { UploadeImage } from "@/app/components/uploadeImage";
import { toast } from "sonner";

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
  image?: string | null;
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

  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [imageFile, setImageFile] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

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

  const handleImageChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setLoading(true);
    try {
      const res = await UploadeImage(file);
      setImageFile(res);
      setImagePreview(res);
    } catch (err: any) {
      toast.error(
        `${err.message ? err.message : "Something was wrong try again"}`,
      );
    } finally {
      setLoading(false);
    }
  };

  const onSubmit = async (data: CategoryFormData) => {
    try {
      const finalPayload = {
        ...data,
        order: Number(data.order),
        image: imageFile ? imageFile : null,
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
        toast.success("Category added successfully");
        setImageFile(null);
        setImagePreview(null);
        reset();
      }
    } catch {
      toast.error("Failed to save. Please try again.");
    }
  };

  return (
    <div className="min-h-screen flex justify-center items-start py-8 px-3 sm:px-4">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="w-full max-w-2xl space-y-6 rounded-xl border bg-white p-5 sm:p-8 shadow-sm"
      >
        {/* Header */}
        <div className="flex items-center gap-2 border-b pb-4 text-primary">
          <LayoutGrid size={22} />
          <h2 className="text-xl sm:text-2xl font-bold">Add New Category</h2>
        </div>

        {/* Main Category */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="text-sm font-semibold text-gray-700">
              Category Name
            </label>
            <input
              {...register("name", { required: "Name is required" })}
              className="mt-1 w-full rounded-lg border px-4 py-3 text-sm focus:border-primary outline-none"
            />
            {errors.name && (
              <p className="mt-1 text-xs text-red-500">{errors.name.message}</p>
            )}
          </div>

          <div>
            <label className="text-sm font-semibold text-gray-700">Slug</label>
            <input
              {...register("slug")}
              readOnly
              className="mt-1 w-full rounded-lg border bg-gray-50 px-4 py-3 text-sm text-gray-500"
            />
          </div>
        </div>

        {/* Category Image */}
        <div>
          <label className="text-sm font-semibold text-gray-700">
            Category Image
          </label>

          <div className="mt-2 flex flex-col items-center justify-center gap-3 rounded-lg border-2 border-dashed border-gray-300 p-4 sm:p-6 text-center">
            {imagePreview ? (
              <img
                src={imagePreview}
                alt="Category Preview"
                className="h-32 w-32 rounded-lg object-cover"
              />
            ) : (
              <div className="flex flex-col items-center text-gray-500">
                <ImagePlus size={32} />
                <p className="text-sm mt-1">Upload category image</p>
              </div>
            )}

            <label className="cursor-pointer rounded-lg bg-primary px-4 py-2 text-sm font-bold text-white">
              {loading ? "Uploading..." : "Change Image"}
              <input
                type="file"
                accept="image/*"
                onChange={handleImageChange}
                className="hidden"
              />
            </label>
          </div>
        </div>

        {/* Sub Categories */}
        {/* <div className="rounded-lg border bg-gray-50 p-4">
          <p className="mb-3 text-sm font-bold text-gray-700 uppercase">
            Sub-Categories
          </p>

          <div className="space-y-4">
            {fields.map((field, index) => (
              <div
                key={field.id}
                className="rounded-lg border bg-white p-4 space-y-3"
              >
                <input
                  {...register(`subCategories.${index}.name` as const)}
                  placeholder="Subcategory name"
                  className="w-full rounded border px-3 py-2 text-sm"
                />

                <div className="flex items-center justify-between">
                  <label className="flex items-center gap-3 text-sm font-medium">
                    <input
                      type="checkbox"
                      {...register(`subCategories.${index}.isActive` as const)}
                      className="h-5 w-5 text-primary"
                    />
                    Active
                  </label>

                  <button
                    type="button"
                    onClick={() => remove(index)}
                    className="flex items-center gap-1 text-red-500 text-sm"
                  >
                    <Trash2 size={16} />
                    Remove
                  </button>
                </div>
              </div>
            ))}
          </div>

          <button
            type="button"
            onClick={() => append({ name: "", isActive: true })}
            className="mt-4 w-full sm:w-auto flex justify-center items-center gap-2 rounded-lg border px-4 py-2 text-sm font-bold text-primary"
          >
            <Plus size={18} />
            Add Sub-Category
          </button>
        </div> */}

        {/* Footer */}
        <div className="space-y-4 sm:space-y-0 sm:flex sm:items-center sm:justify-between border-t pt-6">
          <div className="flex flex-col sm:flex-row gap-4">
            <div>
              <label className="text-xs font-bold text-gray-500 uppercase">
                Sort Order
              </label>
              <input
                type="number"
                {...register("order")}
                className="w-28 rounded border px-2 py-1 text-sm"
              />
            </div>

            <label className="flex items-center gap-2 mt-4 sm:mt-0">
              <input
                type="checkbox"
                {...register("isActive")}
                className="h-5 w-5 text-primary"
              />
              <span className="text-sm font-bold">Category Published</span>
            </label>
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full sm:w-auto rounded-lg bg-primary px-6 py-3 font-bold text-white shadow-md"
          >
            {isSubmitting ? "Processing..." : "Save Category"}
          </button>
        </div>
      </form>
    </div>
  );
}
