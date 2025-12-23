"use client";

import { useState, ChangeEvent } from "react";
import { Upload, X, Plus, Trash2, Save, Eye, EyeOff } from "lucide-react";

// Define types
interface Discount {
  type: "percentage" | "flat";
  value: string;
}

interface Variant {
  attributes: {
    color: string;
    size: string;
  };
  sku: string;
  price?: string;
  stock: number;
}

interface Seo {
  metaTitle: string;
  metaDescription: string;
}

interface ProductFormData {
  title: string;
  slug: string;
  description: string;
  shortDescription: string;
  basePrice: string;
  discount: Discount;
  sku: string;
  stockQuantity: string;
  stockStatus: "in-stock" | "out-of-stock" | "pre-order";
  categoryId: string;
  subCategoryId: string;
  tags: string[];
  thumbnail: File | null;
  gallery: string[];
  variants: Variant[];
  seo: Seo;
  isDraft: boolean;
  featured: boolean;
}

interface PreviewImages {
  thumbnail: string | null;
  gallery: string[];
}

export default function AddProductForm() {
  const [formData, setFormData] = useState<ProductFormData>({
    title: "",
    slug: "",
    description: "",
    shortDescription: "",
    basePrice: "",
    discount: { type: "percentage", value: "" },
    sku: "",
    stockQuantity: "",
    stockStatus: "in-stock",
    categoryId: "",
    subCategoryId: "",
    tags: [],
    thumbnail: null,
    gallery: [],
    variants: [],
    seo: {
      metaTitle: "",
      metaDescription: "",
    },
    isDraft: false,
    featured: false,
  });

  const [tagInput, setTagInput] = useState("");
  const [variantForm, setVariantForm] = useState({
    color: "",
    size: "",
    sku: "",
    price: "",
    stock: "",
  });
  const [showVariantForm, setShowVariantForm] = useState(false);
  const [previewImages, setPreviewImages] = useState<PreviewImages>({
    thumbnail: null,
    gallery: [],
  });
  const [activeTab, setActiveTab] = useState("basic");

  // Handle basic inputs
  const handleInputChange = (
    e: ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const target = e.target as HTMLInputElement;
    const { name, value, type, checked } = target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  // Handle nested inputs
  const handleNestedChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    section: keyof ProductFormData
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [section]: {
        ...(prev[section] as any),
        [name]: value,
      },
    }));
  };

//   Record<string, unknown>;

  // Auto generate slug
  const generateSlug = (title: string) => {
    return title
      .toLowerCase()
      .trim()
      .replace(/[^\w\s-]/g, "")
      .replace(/\s+/g, "-");
  };

  const handleTitleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const title = e.target.value;
    handleInputChange(e);
    setFormData((prev) => ({
      ...prev,
      slug: generateSlug(title),
    }));
  };

  // Handle tags
  const addTag = () => {
    if (tagInput.trim() && !formData.tags.includes(tagInput.trim())) {
      setFormData((prev) => ({
        ...prev,
        tags: [...prev.tags, tagInput.trim()],
      }));
      setTagInput("");
    }
  };

  const removeTag = (index: number) => {
    setFormData((prev) => ({
      ...prev,
      tags: prev.tags.filter((_, i) => i !== index),
    }));
  };

  // Handle thumbnail
  const handleThumbnailChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        setPreviewImages((prev) => ({
          ...prev,
          thumbnail: event.target?.result as string,
        }));
      };
      reader.readAsDataURL(file);
    }
  };

  // Handle gallery
  const handleGalleryChange = (e: ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    const remaining = 5 - formData.gallery.length;
    const toAdd = files.slice(0, remaining);

    toAdd.forEach((file) => {
      const reader = new FileReader();
      reader.onload = (event) => {
        setPreviewImages((prev) => ({
          ...prev,
          gallery: [...prev.gallery, event.target?.result as string],
        }));
        setFormData((prev) => ({
          ...prev,
          gallery: [...prev.gallery, file.name],
        }));
      };
      reader.readAsDataURL(file);
    });
  };

  const removeGalleryImage = (index: number) => {
    setPreviewImages((prev) => ({
      ...prev,
      gallery: prev.gallery.filter((_, i) => i !== index),
    }));
    setFormData((prev) => ({
      ...prev,
      gallery: prev.gallery.filter((_, i) => i !== index),
    }));
  };

  // Handle variants
  const handleVariantChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setVariantForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const addVariant = () => {
    if (
      variantForm.color &&
      variantForm.size &&
      variantForm.sku &&
      variantForm.stock
    ) {
      setFormData((prev) => ({
        ...prev,
        variants: [
          ...prev.variants,
          {
            attributes: { color: variantForm.color, size: variantForm.size },
            sku: variantForm.sku,
            price: variantForm.price || undefined,
            stock: parseInt(variantForm.stock),
          },
        ],
      }));
      setVariantForm({ color: "", size: "", sku: "", price: "", stock: "" });
      setShowVariantForm(false);
    }
  };

  const removeVariant = (index: number) => {
    setFormData((prev) => ({
      ...prev,
      variants: prev.variants.filter((_, i) => i !== index),
    }));
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log("Form Data:", formData);
    alert("Form submitted! Check console for data.");
  };

  const tabs = [
    { id: "basic", label: "Basic Info" },
    { id: "pricing", label: "Pricing" },
    { id: "inventory", label: "Inventory" },
    { id: "media", label: "Media" },
    { id: "variants", label: "Variants" },
    { id: "seo", label: "SEO" },
  ];

  return (
    <div className="min-h-screen p-4 sm:p-6 lg:p-8">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">
            Create Product
          </h1>
          <p className="text-gray-500 mt-2">Add a new product to your store</p>
        </div>

        {/* Tabs */}
        <div className="bg-white rounded-lg border border-gray-200 mb-6 overflow-hidden">
          <div className="overflow-x-auto">
            <div className="flex border-b border-gray-200">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex-1 min-w-max sm:flex-none px-4 py-3 font-medium text-sm transition whitespace-nowrap ${
                    activeTab === tab.id
                      ? "border-b-2 border-[#0970B4] text-[#0970B4]"
                      : "text-gray-600 hover:text-gray-900"
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* BASIC INFO */}
          {activeTab === "basic" && (
            <div className="bg-white rounded-lg border border-gray-200 p-4 sm:p-6 space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-900 mb-2">
                  Product Title *
                </label>
                <input
                  type="text"
                  name="title"
                  value={formData.title}
                  onChange={handleTitleChange}
                  placeholder="Enter product title"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#0970B4] focus:border-transparent"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-900 mb-2">
                  Slug (Auto-generated)
                </label>
                <input
                  type="text"
                  name="slug"
                  value={formData.slug}
                  onChange={handleInputChange}
                  placeholder="slug-will-generate-automatically"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg bg-gray-50"
                  disabled
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-900 mb-2">
                  Short Description
                </label>
                <input
                  type="text"
                  name="shortDescription"
                  value={formData.shortDescription}
                  required
                  onChange={handleInputChange}
                  placeholder="Brief description for listings"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#0970B4] focus:border-transparent"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-900 mb-2">
                  Full Description
                </label>
                <textarea
                  name="description"
                  value={formData.description}
                  onChange={handleInputChange}
                  required
                  placeholder="Detailed product description"
                  rows={5}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#0970B4] focus:border-transparent"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-900 mb-2">
                    Category *
                  </label>
                  <select
                    name="categoryId"
                    value={formData.categoryId}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#0970B4] focus:border-transparent"
                    required
                  >
                    <option value="">Select a category</option>
                    <option value="cat1">Electronics</option>
                    <option value="cat2">Clothing</option>
                    <option value="cat3">Books</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-900 mb-2">
                    Sub Category
                  </label>
                  <select
                    name="subCategoryId"
                    value={formData.subCategoryId}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#0970B4] focus:border-transparent"
                  >
                    <option value="">Select a sub-category</option>
                    <option value="sub1">Phones</option>
                    <option value="sub2">Laptops</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-900 mb-2">
                  Tags
                </label>
                <div className="flex gap-2 flex-col sm:flex-row">
                  <input
                    type="text"
                    value={tagInput}
                    required
                    onChange={(e) => setTagInput(e.target.value)}
                    placeholder="Add a tag and press button"
                    className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#0970B4] focus:border-transparent"
                    onKeyPress={(e) =>
                      e.key === "Enter" && (e.preventDefault(), addTag())
                    }
                  />
                  <button
                    type="button"
                    onClick={addTag}
                    className="px-4 py-2 bg-[#0970B4] text-white rounded-lg hover:bg-blue-700 transition"
                  >
                    Add
                  </button>
                </div>
                <div className="flex flex-wrap gap-2 mt-3">
                  {formData.tags.map((tag, index) => (
                    <span
                      key={index}
                      className="inline-flex items-center gap-2 px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm"
                    >
                      {tag}
                      <button
                        type="button"
                        onClick={() => removeTag(index)}
                        className="hover:text-blue-900"
                      >
                        <X size={14} />
                      </button>
                    </span>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* PRICING */}
          {activeTab === "pricing" && (
            <div className="bg-white rounded-lg border border-gray-200 p-4 sm:p-6 space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-900 mb-2">
                  Base Price (৳) *
                </label>
                <input
                  type="number"
                  name="basePrice"
                  value={formData.basePrice}
                  onChange={handleInputChange}
                  placeholder="0.00"
                  step="0.01"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#0970B4] focus:border-transparent"
                  required
                />
              </div>

              <div className="space-y-4">
                <h3 className="font-semibold text-gray-900">
                  Discount (Optional)
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-900 mb-2">
                      Discount Type
                    </label>
                    <select
                      name="type"
                      value={formData.discount.type}
                      required
                      onChange={(e) =>
                        setFormData((prev) => ({
                          ...prev,
                          discount: {
                            ...prev.discount,
                            type: e.target.value as "percentage" | "flat",
                          },
                        }))
                      }
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#0970B4] focus:border-transparent"
                    >
                      <option value="percentage">Percentage (%)</option>
                      <option value="flat">Flat (৳)</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-900 mb-2">
                      Discount Value
                    </label>
                    <input
                      type="number"
                      name="value"
                      value={formData.discount.value}
                      required
                      onChange={(e) =>
                        setFormData((prev) => ({
                          ...prev,
                          discount: { ...prev.discount, value: e.target.value },
                        }))
                      }
                      placeholder="0"
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#0970B4] focus:border-transparent"
                    />
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* INVENTORY */}
          {activeTab === "inventory" && (
            <div className="bg-white rounded-lg border border-gray-200 p-4 sm:p-6 space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-900 mb-2">
                  SKU (Stock Keeping Unit) *
                </label>
                <input
                  type="text"
                  name="sku"
                  value={formData.sku}
                  onChange={handleInputChange}
                  placeholder="e.g., PRD-001"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#0970B4] focus:border-transparent"
                  required
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-900 mb-2">
                    Stock Quantity
                  </label>
                  <input
                    type="number"
                    name="stockQuantity"
                    value={formData.stockQuantity}
                    onChange={handleInputChange}
                    required
                    placeholder="0"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#0970B4] focus:border-transparent"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-900 mb-2">
                    Stock Status *
                  </label>
                  <select
                    name="stockStatus"
                    value={formData.stockStatus}
                    required
                    onChange={handleInputChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#0970B4] focus:border-transparent"
                  >
                    <option value="in-stock">In Stock</option>
                    <option value="out-of-stock">Out of Stock</option>
                    <option value="pre-order">Pre Order</option>
                  </select>
                </div>
              </div>
            </div>
          )}

          {/* MEDIA */}
          {activeTab === "media" && (
            <div className="bg-white rounded-lg border border-gray-200 p-4 sm:p-6 space-y-6">
              {/* Thumbnail */}
              <div>
                <label className="block text-sm font-medium text-gray-900 mb-3">
                  Thumbnail Image *
                </label>
                <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:bg-gray-50 transition">
                  {previewImages.thumbnail ? (
                    <div className="space-y-4">
                      <img
                        src={previewImages.thumbnail}
                        alt="Thumbnail"
                        className="w-full max-w-xs h-40 object-cover rounded-lg mx-auto"
                      />
                      <button
                        type="button"
                        onClick={() =>
                          setPreviewImages((prev) => ({
                            ...prev,
                            thumbnail: null,
                          }))
                        }
                        className="px-4 py-2 text-red-600 hover:bg-red-50 rounded-lg transition"
                      >
                        Remove
                      </button>
                    </div>
                  ) : (
                    <label className="cursor-pointer">
                      <div className="flex flex-col items-center gap-2">
                        <Upload className="text-gray-400" size={32} />
                        <span className="text-sm text-gray-600">
                          Click to upload or drag and drop
                        </span>
                      </div>
                      <input
                        type="file"
                        accept="image/*"
                        required
                        onChange={handleThumbnailChange}
                        className="hidden"
                      />
                    </label>
                  )}
                </div>
              </div>

              {/* Gallery */}
              <div>
                <label className="block text-sm font-medium text-gray-900 mb-3">
                  Gallery Images (Max 5)
                </label>
                <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:bg-gray-50 transition">
                  <label className="cursor-pointer">
                    <div className="flex flex-col items-center gap-2">
                      <Upload className="text-gray-400" size={32} />
                      <span className="text-sm text-gray-600">
                        Click to upload {5 - formData.gallery.length} more
                        images
                      </span>
                    </div>
                    <input
                      type="file"
                      multiple
                      accept="image/*"
                      onChange={handleGalleryChange}
                      disabled={formData.gallery.length >= 5}
                      className="hidden"
                    />
                  </label>
                </div>

                {/* Gallery Preview */}
                {previewImages.gallery.length > 0 && (
                  <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4 mt-4">
                    {previewImages.gallery.map((image, index) => (
                      <div key={index} className="relative group">
                        <img
                          src={image}
                          alt={`Gallery ${index + 1}`}
                          className="w-full h-24 object-cover rounded-lg"
                        />
                        <button
                          type="button"
                          onClick={() => removeGalleryImage(index)}
                          className="absolute top-1 right-1 bg-red-600 text-white p-1 rounded-full opacity-0 group-hover:opacity-100 transition"
                        >
                          <X size={16} />
                        </button>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          )}

          {/* VARIANTS */}
          {activeTab === "variants" && (
            <div className="bg-white rounded-lg border border-gray-200 p-4 sm:p-6 space-y-6">
              {/* Variants List */}
              {formData.variants.length > 0 && (
                <div className="space-y-3">
                  <h3 className="font-semibold text-gray-900">
                    Added Variants
                  </h3>
                  <div className="overflow-x-auto">
                    <table className="w-full text-sm">
                      <thead>
                        <tr className="border-b border-gray-200">
                          <th className="text-left py-3 px-3 font-medium text-gray-700">
                            Color
                          </th>
                          <th className="text-left py-3 px-3 font-medium text-gray-700">
                            Size
                          </th>
                          <th className="text-left py-3 px-3 font-medium text-gray-700">
                            SKU
                          </th>
                          <th className="text-left py-3 px-3 font-medium text-gray-700">
                            Stock
                          </th>
                          <th className="text-left py-3 px-3 font-medium text-gray-700">
                            Action
                          </th>
                        </tr>
                      </thead>
                      <tbody>
                        {formData.variants.map((variant, index) => (
                          <tr key={index} className="border-b border-gray-100">
                            <td className="py-3 px-3">
                              {variant.attributes.color}
                            </td>
                            <td className="py-3 px-3">
                              {variant.attributes.size}
                            </td>
                            <td className="py-3 px-3">{variant.sku}</td>
                            <td className="py-3 px-3">{variant.stock}</td>
                            <td className="py-3 px-3">
                              <button
                                type="button"
                                onClick={() => removeVariant(index)}
                                className="text-red-600 hover:text-red-700"
                              >
                                <Trash2 size={18} />
                              </button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              )}

              {/* Add Variant Form */}
              {showVariantForm ? (
                <div className="border border-gray-300 rounded-lg p-4 space-y-4 bg-gray-50">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-900 mb-2">
                        Color
                      </label>
                      <input
                        type="text"
                        name="color"
                        value={variantForm.color}
                        required
                        onChange={handleVariantChange}
                        placeholder="e.g., Red"
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#0970B4] focus:border-transparent"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-900 mb-2">
                        Size
                      </label>
                      <input
                        type="text"
                        name="size"
                        value={variantForm.size}
                        onChange={handleVariantChange}
                        required
                        placeholder="e.g., M"
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#0970B4] focus:border-transparent"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-900 mb-2">
                        SKU
                      </label>
                      <input
                        type="text"
                        name="sku"
                        value={variantForm.sku}
                        onChange={handleVariantChange}
                        required
                        placeholder="e.g., PRD-001-RED-M"
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#0970B4] focus:border-transparent"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-900 mb-2">
                        Price (Optional)
                      </label>
                      <input
                        type="number"
                        name="price"
                        value={variantForm.price}
                        required
                        onChange={handleVariantChange}
                        placeholder="0.00"
                        step="0.01"
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#0970B4] focus:border-transparent"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-900 mb-2">
                      Stock *
                    </label>
                    <input
                      type="number"
                      name="stock"
                      value={variantForm.stock}
                      required
                      onChange={handleVariantChange}
                      placeholder="0"
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#0970B4] focus:border-transparent"
                    />
                  </div>

                  <div className="flex gap-3 flex-col sm:flex-row">
                    <button
                      type="button"
                      onClick={addVariant}
                      className="flex-1 px-4 py-2 bg-[#0970B4] text-white rounded-lg hover:bg-blue-700 transition"
                    >
                      Add Variant
                    </button>
                    <button
                      type="button"
                      onClick={() => setShowVariantForm(false)}
                      className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition"
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              ) : (
                <button
                  type="button"
                  onClick={() => setShowVariantForm(true)}
                  className="w-full flex items-center justify-center gap-2 px-4 py-3 border-2 border-dashed border-gray-300 rounded-lg text-[#0970B4] hover:bg-blue-50 transition"
                >
                  <Plus size={20} />
                  Add New Variant
                </button>
              )}
            </div>
          )}

          {/* SEO */}
          {activeTab === "seo" && (
            <div className="bg-white rounded-lg border border-gray-200 p-4 sm:p-6 space-y-6">
              {/* Meta Title */}
              <div>
                <label className="block text-sm font-medium text-gray-900 mb-2">
                  Meta Title
                </label>
                <div className="space-y-1">
                  <input
                    type="text"
                    name="metaTitle"
                    value={formData.seo.metaTitle}
                    onChange={(e) => handleNestedChange(e, "seo")}
                    placeholder="SEO title (max 60 characters)"
                    maxLength={60}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#0970B4]"
                  />
                  <p className="text-xs text-gray-500">
                    {formData.seo.metaTitle.length}/60 characters
                  </p>
                </div>
              </div>

              {/* Meta Description */}
              <div>
                <label className="block text-sm font-medium text-gray-900 mb-2">
                  Meta Description
                </label>
                <div className="space-y-1">
                  <textarea
                    name="metaDescription"
                    value={formData.seo.metaDescription}
                    onChange={(e) => handleNestedChange(e, "seo")}
                    placeholder="SEO description (max 160 characters)"
                    maxLength={160}
                    rows={3}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#0970B4]"
                  />
                  <p className="text-xs text-gray-500">
                    {formData.seo.metaDescription.length}/160 characters
                  </p>
                </div>
              </div>

              {/* Visibility */}
              <div className="pt-4 border-t border-gray-200">
                <h3 className="font-semibold text-gray-900 mb-3">Visibility</h3>

                <div className="space-y-3">
                  <label className="flex items-center gap-3 cursor-pointer">
                    <input
                      type="checkbox"
                      name="isDraft"
                      checked={formData.isDraft}
                      onChange={handleInputChange}
                      className="w-4 h-4 text-[#0970B4] border-gray-300 rounded"
                    />
                    <span className="text-sm text-gray-700">
                      Save as Draft (not visible to customers)
                    </span>
                  </label>

                  <label className="flex items-center gap-3 cursor-pointer">
                    <input
                      type="checkbox"
                      name="featured"
                      checked={formData.featured}
                      onChange={handleInputChange}
                      className="w-4 h-4 text-[#0970B4] border-gray-300 rounded"
                    />
                    <span className="text-sm text-gray-700">
                      Mark as Featured Product
                    </span>
                  </label>
                </div>
              </div>
            </div>
          )}
          {/* Action Buttons */}
          <div className="flex gap-3 flex-col sm:flex-row justify-end pt-6 border-t border-gray-200">
            <button
              type="button"
              className="flex items-center justify-center gap-2 px-6 py-3 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition font-medium"
            >
              <Eye size={20} />
              Preview
            </button>
            <button
              type="button"
              className="flex items-center justify-center gap-2 px-6 py-3 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition font-medium"
            >
              <EyeOff size={20} />
              Save as Draft
            </button>
            <button
              type="submit"
              className="flex items-center justify-center gap-2 px-6 py-3 bg-[#0970B4] text-white rounded-lg hover:bg-blue-700 transition font-medium"
            >
              <Save size={20} />
              Publish Product
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
