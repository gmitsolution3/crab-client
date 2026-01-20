"use client";

import React, { useState } from "react";
import { Trash2, Edit2, Check, X } from "lucide-react";
import { toast } from "sonner";
import Swal from "sweetalert2";

// Type definitions
interface Category {
  _id: string;
  name: string;
  slug: string;
  isActive: boolean;
  order: string;
}

interface StatusPopupState {
  isOpen: boolean;
  categoryId: string | null;
}

interface AllCategoriesProps {
  allCategories: Category[];
}

// Component
const CategoryManagement = ({ allCategories }: AllCategoriesProps) => {
  const [categories, setCategories] = useState<Category[]>(allCategories);

  const [statusPopup, setStatusPopup] = useState<StatusPopupState>({
    isOpen: false,
    categoryId: null,
  });

  // Handle status toggle
  const handleStatusToggle = async (id: string): Promise<void> => {
    setStatusPopup({ isOpen: false, categoryId: null });

    try {
      const category = categories.find((cat) => cat._id === id);
      if (!category) return;

      // API call - uncomment and update with your endpoint
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_EXPRESS_SERVER_BASE_URL}/create-category/toggle-status/${id}`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ isActive: !category.isActive }),
        },
      );

      const result = await response.json();

      if (!result.success) {
        toast.error(`error: ${result.message}`);
        return;
      }

      console.log(result)

      // if (!response.ok) {
      //   throw new Error('Failed to update status');
      // }

      // Update local state
      setCategories((prevCategories) =>
        prevCategories.map((cat) =>
          cat._id === id
            ? {
                ...cat,
                isActive: !cat.isActive,
              }
            : cat,
        ),
      );
      toast.success("Data updated successfully");
    } catch (error) {
      console.error("Error updating status:", error);
      // Add error handling/notification here
    }
  };

  // Handle delete
  const handleDelete = (id: string) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#f58313",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          // API call - uncomment and update with your endpoint
          const response = await fetch(
            `${process.env.NEXT_PUBLIC_EXPRESS_SERVER_BASE_URL}/create-category/drop-category/${id}`,
            {
              method: "DELETE",
              headers: {
                "Content-Type": "application/json",
              },
            },
          );

          const result = await response.json();

          if (!result.success) {
            toast.error(`${result.message}`);
          }

          // if (!response.ok) {
          //   throw new Error('Failed to delete category');
          // }

          // Update local state
          setCategories((prevCategories) =>
            prevCategories.filter((cat) => cat._id !== id),
          );
          toast.success(`${result.message}`);
        } catch (error) {
          console.error("Error deleting category:", error);
          // Add error handling/notification here
          toast.error(`Error: ${error}`);
        }
      }
    });
  };

  if (!categories || categories.length === 0) {
    return (
      <div className="min-h-screen flex justify-center items-center">
        <h1 className="text-3xl text-center text-[#f58313]">
          No Categories found
        </h1>
      </div>
    );
  }

  // Get current category for popup
  const currentCategory = categories.find(
    (cat) => cat._id === statusPopup.categoryId,
  );

  return (
    <div className="min-h-screen p-4 sm:p-6 lg:p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">
            Category Management
          </h1>
          <p className="text-gray-600 mt-2">Manage your product categories</p>
        </div>

        {/* Table Container */}
        <div className="bg-white rounded-lg shadow overflow-hidden">
          {/* Desktop View */}
          <div className="hidden md:block overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="bg-[#f58313] border-b-2 text-white">
                  <th className="px-6 py-4 text-left text-sm font-semibold">
                    Category Name
                  </th>
                  <th className="px-6 py-4 text-left text-sm font-semibold">
                    Slug
                  </th>
                  <th className="px-6 py-4 text-left text-sm font-semibold">
                    Order
                  </th>
                  <th className="px-6 py-4 text-left text-sm font-semibold">
                    Status
                  </th>
                  <th className="px-6 py-4 text-center text-sm font-semibold">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {categories.map((category) => (
                  <tr
                    key={category._id}
                    className="hover:bg-gray-50 transition"
                  >
                    <td className="px-6 py-4 text-sm font-medium text-gray-900">
                      {category.name}
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-600">
                      {category.slug}
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-600">
                      {category.order}
                    </td>
                    <td className="px-6 py-4">
                      <span
                        className={`inline-flex px-3 py-1 rounded-full text-xs font-semibold ${
                          category.isActive
                            ? "bg-green-100 text-green-800"
                            : "bg-red-100 text-red-800"
                        }`}
                      >
                        {category.isActive ? "Active" : "Inactive"}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex gap-3 justify-center">
                        <button
                          onClick={() =>
                            setStatusPopup({
                              isOpen: true,
                              categoryId: category._id,
                            })
                          }
                          className="p-2 rounded-lg transition hover:bg-blue-50"
                          style={{ color: "#f58313" }}
                          title="Change Status"
                          aria-label={`Change status for ${category.name}`}
                        >
                          <Edit2 size={18} />
                        </button>
                        <button
                          onClick={() => handleDelete(category._id)}
                          className="p-2 rounded-lg text-red-600 hover:bg-red-50 transition"
                          title="Delete"
                          aria-label={`Delete ${category.name}`}
                        >
                          <Trash2 size={18} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Mobile & Tablet View */}
          <div className="md:hidden">
            <div className="space-y-4 p-4">
              {categories.map((category) => (
                <div
                  key={category._id}
                  className="border border-gray-200 rounded-lg p-4"
                >
                  <div className="flex justify-between items-start mb-3">
                    <h3 className="text-sm font-bold text-gray-900 flex-1 pr-2">
                      {category.name}
                    </h3>
                    <span
                      className={`text-xs font-semibold px-2 py-1 rounded whitespace-nowrap ${
                        category.isActive
                          ? "bg-green-100 text-green-800"
                          : "bg-red-100 text-red-800"
                      }`}
                    >
                      {category.isActive ? "Active" : "Inactive"}
                    </span>
                  </div>

                  <div className="space-y-2 mb-4 text-xs text-gray-600">
                    <p>
                      <span className="font-semibold text-gray-900">Slug:</span>{" "}
                      {category.slug}
                    </p>
                    <p>
                      <span className="font-semibold text-gray-900">
                        Order:
                      </span>{" "}
                      {category.order}
                    </p>
                  </div>

                  <div className="flex gap-2 justify-end">
                    <button
                      onClick={() =>
                        setStatusPopup({
                          isOpen: true,
                          categoryId: category._id,
                        })
                      }
                      className="flex-1 p-2 rounded-lg transition flex items-center justify-center gap-2"
                      style={{ backgroundColor: "#f58313", color: "white" }}
                      title="Change Status"
                    >
                      <Edit2 size={16} />
                      <span>Change</span>
                    </button>
                    <button
                      onClick={() => handleDelete(category._id)}
                      className="p-2 rounded-lg text-red-600 hover:bg-red-50 transition"
                      title="Delete"
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Status Change Popup */}
      {statusPopup.isOpen && currentCategory && (
        <div className="fixed inset-0 bg-white/5 backdrop-blur-sm bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg shadow-lg max-w-sm w-full p-6">
            <h2 className="text-lg font-bold text-gray-900 mb-4">
              Change Status
            </h2>
            <p className="text-gray-600 mb-6">
              Are you sure you want to{" "}
              {currentCategory.isActive ? "deactivate" : "activate"} this
              category?
            </p>

            <div className="flex gap-3">
              <button
                onClick={() =>
                  setStatusPopup({ isOpen: false, categoryId: null })
                }
                className="flex-1 px-4 py-2 rounded-lg border border-gray-300 text-gray-700 font-medium hover:bg-gray-50 transition flex items-center justify-center gap-2"
              >
                <X size={18} />
                <span>Cancel</span>
              </button>
              <button
                onClick={() => handleStatusToggle(statusPopup.categoryId!)}
                className="flex-1 px-4 py-2 rounded-lg text-white font-medium transition flex items-center justify-center gap-2"
                style={{ backgroundColor: "#f58313" }}
              >
                <Check size={18} />
                <span>Confirm</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CategoryManagement;
