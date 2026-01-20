"use client";

import React, { useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { Edit2, Trash2 } from "lucide-react";
import StockStatusDropdown from "./stockStatusDropdown";
import { MdPublishedWithChanges } from "react-icons/md";
import axios from "axios";

// ============ TYPE DEFINITIONS ============
interface Discount {
  type: "percentage" | "fixed";
  value: string;
}

interface SEO {
  metaTitle: string;
  metaDescription: string;
}

interface Variant {
  attributes: {
    color?: string;
    size?: string;
    [key: string]: string | undefined;
  };
  sku: string;
  stock: number;
}

interface Product {
  _id: string;
  title: string;
  slug: string;
  description: string;
  shortDescription: string;
  basePrice: string;
  discount: Discount;
  sku: string;
  stockQuantity: string;
  stockStatus: "in-stock" | "out-of-stock";
  categoryId: string;
  subCategoryId: string;
  category: string;
  subCategory: string;
  tags: string[];
  thumbnail: string;
  gallery: string[];
  variants: Variant[];
  seo: SEO;
  isDraft: boolean;
  featured: boolean;
  isDelete: boolean;
  deletedAt: string;
  createdAt: string;
}

interface productDescription {
  title: string;
  subTitle: string;
}

interface ProductProps {
  INITIAL_PRODUCTS: Product[];
  description?: productDescription;
}

interface EditFormData {
  title: string;
  slug: string;
  description: string;
  shortDescription: string;
  basePrice: string;
  discountType: "percentage" | "fixed";
  discountValue: string;
  sku: string;
  stockQuantity: string;
  stockStatus: "in-stock" | "out-of-stock";
  category: string;
}

// ============ EDIT MODAL COMPONENT ============
interface EditModalProps {
  product: Product | null;
  onClose: () => void;
  onSave: (data: EditFormData) => void;
}

const EditModal: React.FC<EditModalProps> = ({ product, onClose, onSave }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    watch,
  } = useForm<EditFormData>({
    defaultValues: product
      ? {
          title: product.title,
          slug: product.slug,
          description: product.description,
          shortDescription: product.shortDescription,
          basePrice: product.basePrice,
          discountType: product.discount.type,
          discountValue: product.discount.value,
          sku: product.sku,
          stockQuantity: product.stockQuantity,
          stockStatus: product.stockStatus,
          category: product.category,
        }
      : undefined,
  });

  React.useEffect(() => {
    if (product) {
      reset({
        title: product.title,
        slug: product.slug,
        description: product.description,
        shortDescription: product.shortDescription,
        basePrice: product.basePrice,
        discountType: product.discount.type,
        discountValue: product.discount.value,
        sku: product.sku,
        stockQuantity: product.stockQuantity,
        stockStatus: product.stockStatus,
        category: product.category,
      });
    }
  }, [product, reset]);

  const onSubmit = (data: EditFormData) => {
    onSave(data);
  };

  if (!product) return null;

  return (
    <div className="fixed inset-0 bg-white/30 backdrop-blur-md flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg shadow-xl max-w-3xl w-full max-h-[90vh] overflow-y-auto">
        <div className="sticky top-0 bg-gray-50 px-6 py-4 border-b border-gray-200 flex justify-between items-center">
          <h2 className="text-xl font-bold text-gray-900">Edit Product</h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700 text-2xl"
          >
            ×
          </button>
        </div>

        <div className="p-6 space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Title
            </label>
            <input
              type="text"
              {...register("title", { required: "Title is required" })}
              className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#f58313] ${
                errors.title ? "border-red-500" : "border-gray-300"
              }`}
            />
            {errors.title && (
              <p className="text-red-500 text-sm mt-1">
                {errors.title.message}
              </p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Slug
            </label>
            <input
              type="text"
              {...register("slug", { required: "Slug is required" })}
              className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#f58313] ${
                errors.slug ? "border-red-500" : "border-gray-300"
              }`}
            />
            {errors.slug && (
              <p className="text-red-500 text-sm mt-1">{errors.slug.message}</p>
            )}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Base Price
              </label>
              <input
                type="text"
                {...register("basePrice", {
                  required: "Base Price is required",
                })}
                className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#f58313] ${
                  errors.basePrice ? "border-red-500" : "border-gray-300"
                }`}
              />
              {errors.basePrice && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.basePrice.message}
                </p>
              )}
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Stock Quantity
              </label>
              <input
                type="text"
                {...register("stockQuantity", {
                  required: "Stock Quantity is required",
                })}
                className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#f58313] ${
                  errors.stockQuantity ? "border-red-500" : "border-gray-300"
                }`}
              />
              {errors.stockQuantity && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.stockQuantity.message}
                </p>
              )}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                SKU
              </label>
              <input
                type="text"
                {...register("sku", { required: "SKU is required" })}
                className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#f58313] ${
                  errors.sku ? "border-red-500" : "border-gray-300"
                }`}
              />
              {errors.sku && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.sku.message}
                </p>
              )}
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Category
              </label>
              <input
                type="text"
                {...register("category", { required: "Category is required" })}
                className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#f58313] ${
                  errors.category ? "border-red-500" : "border-gray-300"
                }`}
              />
              {errors.category && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.category.message}
                </p>
              )}
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Short Description
            </label>
            <input
              type="text"
              {...register("shortDescription", {
                required: "Short Description is required",
              })}
              className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#f58313] ${
                errors.shortDescription ? "border-red-500" : "border-gray-300"
              }`}
            />
            {errors.shortDescription && (
              <p className="text-red-500 text-sm mt-1">
                {errors.shortDescription.message}
              </p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Description
            </label>
            <textarea
              {...register("description", {
                required: "Description is required",
              })}
              rows={4}
              className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#f58313] ${
                errors.description ? "border-red-500" : "border-gray-300"
              }`}
            />
            {errors.description && (
              <p className="text-red-500 text-sm mt-1">
                {errors.description.message}
              </p>
            )}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Discount Type
              </label>
              <select
                {...register("discountType")}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#f58313]"
              >
                <option value="percentage">Percentage</option>
                <option value="fixed">Fixed</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Discount Value
              </label>
              <input
                type="text"
                {...register("discountValue")}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#f58313]"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Stock Status
              </label>
              <select
                {...register("stockStatus")}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#f58313]"
              >
                <option value="in-stock">In Stock</option>
                <option value="out-of-stock">Out of Stock</option>
              </select>
            </div>
          </div>
        </div>

        <div className="bg-gray-50 px-6 py-4 border-t border-gray-200 flex gap-3 justify-end">
          <button
            onClick={onClose}
            className="px-6 py-2 border border-gray-300 rounded-lg font-medium text-gray-700 hover:bg-gray-100 transition-colors"
          >
            Cancel
          </button>
          <button
            onClick={handleSubmit(onSubmit)}
            className="px-6 py-2 rounded-lg font-medium text-white transition-colors"
            style={{ backgroundColor: "#f58313" }}
          >
            Update Product
          </button>
        </div>
      </div>
    </div>
  );
};

// ============ MAIN TABLE COMPONENT ============
const ProductTable = ({ INITIAL_PRODUCTS, description }: ProductProps) => {
  const [products, setProducts] = useState<Product[]>(INITIAL_PRODUCTS || []);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);

  const handleStatusToggle = (id: string, status: any): void => {
    setProducts((prev) =>
      prev.map((p) =>
        p._id === id
          ? {
              ...p,
              stockStatus: status,
            }
          : p
      )
    );
  };

  const handleEdit = (product: Product): void => {
    setEditingProduct(product);
  };

  const handleSaveEdit = (data: EditFormData): void => {
    if (editingProduct) {
      setProducts(
        products.map((p) =>
          p._id === editingProduct._id
            ? {
                ...p,
                title: data.title,
                slug: data.slug,
                description: data.description,
                shortDescription: data.shortDescription,
                basePrice: data.basePrice,
                discount: {
                  type: data.discountType,
                  value: data.discountValue,
                },
                sku: data.sku,
                stockQuantity: data.stockQuantity,
                stockStatus: data.stockStatus,
                category: data.category,
              }
            : p
        )
      );
      setEditingProduct(null);
    }
  };

  // const handleDelete = (id: string): void => {
  //   if (window.confirm("Are you sure you want to delete this product?")) {
  //     setProducts(products.filter((p) => p._id !== id));
  //   }
  // };

  const handleDelete = async (id: string): Promise<void> => {
    if (window.confirm("Are you sure you want to restore this product?")) {
      try {
        const response = await axios.patch(
          `${process.env.NEXT_PUBLIC_EXPRESS_SERVER_BASE_URL}/api/products/primary-delete/${id}`,
          {
            isDeleted: false,
          }
        );


        if (response.status === 200) {
          setProducts((prevProducts) =>
            prevProducts.filter((p) => p._id !== id)
          );

          alert("Product updated successfully!");
        }
      } catch (error) {
        console.error("Error updating product:", error);
        alert("Failed to update product. Please try again.");
      }
    }
  };

  return (
    <div className="min-h-screen p-4 md:p-6 lg:p-8">
      <div className="max-w-400 mx-auto">
        <div className="mb-6">
          <h1 className="text-2xl md:text-3xl font-bold text-gray-900">
            {description?.title}
          </h1>
          <p className="text-gray-600 mt-1">{description?.subTitle}</p>
        </div>

        {/* Desktop Table */}
        <div className="hidden lg:block bg-white rounded-lg shadow overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 border-b border-gray-200">
                <tr>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">
                    Thumbnail
                  </th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">
                    Title
                  </th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">
                    Slug
                  </th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">
                    Base Price
                  </th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">
                    Category
                  </th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">
                    Stock
                  </th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">
                    Status
                  </th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">
                    Action
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {products.map((product) => (
                  <tr
                    key={product._id}
                    className="hover:bg-gray-50 transition-colors"
                  >
                    <td className="px-6 py-4">
                      <img
                        src={product.thumbnail}
                        alt={product.title}
                        className="w-12 h-12 rounded object-cover"
                      />
                    </td>
                    <td className="px-6 py-4">
                      <div className="text-sm font-medium text-gray-900 max-w-xs truncate">
                        {product.title}
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="text-sm text-gray-600 max-w-xs truncate">
                        {product.slug}
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="text-sm font-medium text-gray-900">
                        ৳{product.basePrice}
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="text-sm text-gray-600">
                        {product.category}
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="text-sm text-gray-900 font-medium">
                        {product.stockQuantity}
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <StockStatusDropdown
                        product={product}
                        handleStatusToggle={handleStatusToggle}
                      />
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex gap-2">
                        <button
                          onClick={() => handleEdit(product)}
                          className="p-2 hover:bg-blue-50 rounded-lg transition-colors text-[#f58313] hover:text-[#f58313]"
                          title="Edit"
                        >
                          <Edit2 size={18} />
                        </button>
                        {description?.title === "Manage Product" && (
                          <button
                            onClick={() => handleDelete(product._id)}
                            className="p-2 hover:bg-red-50 rounded-lg transition-colors text-red-600 hover:text-red-700"
                            title="Delete"
                          >
                            <Trash2 size={18} />
                          </button>
                        )}

                        {description?.title === "Draft Product" && (
                          <button
                            className="p-2 hover:bg-green-50 rounded-lg transition-colors text-green-600 hover:text-green-700"
                            title="Publish Now"
                          >
                            <MdPublishedWithChanges size={18} />
                          </button>
                        )}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Tablet & Mobile Cards */}
        {/* <div className="lg:hidden space-y-4">
          {products.map((product) => (
            <div key={product._id} className="bg-white rounded-lg shadow">
              <div className="p-4 md:p-6">
                <div className="flex gap-4 mb-4">
                  <img
                    src={product.thumbnail}
                    alt={product.title}
                    className="w-20 h-20 md:w-24 md:h-24 rounded object-cover shrink-0"
                  />
                  <div className="flex-1 min-w-0">
                    <h3 className="text-sm md:text-base font-semibold text-gray-900 truncate">
                      {product.title}
                    </h3>
                    <p className="text-xs md:text-sm text-gray-600 truncate mt-1">
                      {product.slug}
                    </p>
                    <div className="mt-3 space-y-2">
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-600">Price:</span>
                        <span className="font-semibold text-gray-900">
                          ৳{product.basePrice}
                        </span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-600">Category:</span>
                        <span className="text-gray-900">
                          {product.category}
                        </span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-600">Stock:</span>
                        <span className="font-semibold text-gray-900">
                          {product.stockQuantity}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="space-y-3">
                  <div className="flex gap-2">
                    
                    <StockStatusDropdown
                      product={product}
                      handleStatusToggle={handleStatusToggle}
                    />
                  </div>

                  <div className="flex gap-2">
                    <button
                      onClick={() => handleEdit(product)}
                      className="flex-1 px-4 py-2 rounded-lg transition-colors font-medium text-sm text-white"
                      style={{ backgroundColor: "#f58313" }}
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete(product._id)}
                      className="flex-1 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors font-medium text-sm"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div> */}

        <div className="lg:hidden space-y-4 max-w-75">
          {products.map((product) => (
            <div
              key={product._id}
              className="bg-white rounded-xl shadow-sm border "
            >
              <div className="p-4 space-y-4">
                <div className="flex gap-3">
                  <img
                    src={product.thumbnail}
                    alt={product.title}
                    className="w-16 h-16 rounded-lg object-cover shrink-0"
                  />

                  <div className="flex-1 min-w-0">
                    <h3 className="text-sm font-semibold text-gray-900 truncate">
                      {product.title}
                    </h3>
                    <p className="text-xs text-gray-500 truncate mt-0.5">
                      {product.slug}
                    </p>

                    <div className="mt-2 flex gap-4 text-xs">
                      <span className="font-semibold text-[#f58313]">
                        ৳{product.basePrice}
                      </span>
                      <span className="text-gray-600">
                        Stock: {product.stockQuantity}
                      </span>
                    </div>
                  </div>
                </div>

                <div className="flex justify-between text-xs text-gray-600">
                  <span>Category</span>
                  <span className="font-medium text-gray-900">
                    {product.category}
                  </span>
                </div>

                <div>
                  <StockStatusDropdown
                    product={product}
                    handleStatusToggle={handleStatusToggle}
                  />
                </div>

                <div className="grid grid-cols-2 gap-3 pt-2">
                  <button
                    onClick={() => handleEdit(product)}
                    className="px-4 py-2 rounded-lg text-sm font-semibold text-white"
                    style={{ backgroundColor: "#f58313" }}
                  >
                    Edit
                  </button>

                  <button
                    onClick={() => handleDelete(product._id)}
                    className="px-4 py-2 rounded-lg text-sm font-semibold text-white bg-red-600 hover:bg-red-700"
                  >
                    Delete
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Edit Modal */}
      <EditModal
        product={editingProduct}
        onClose={() => setEditingProduct(null)}
        onSave={handleSaveEdit}
      />
    </div>
  );
};

export default ProductTable;
