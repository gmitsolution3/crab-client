"use client";

import { useState, useRef, useEffect } from "react";

type StockStatus = "in-stock" | "out-of-stock" | "pre-order";

interface Props {
  product: any;
  handleStatusToggle: (id: string, status: StockStatus) => void;
}

export default function StockStatusDropdown({
  product,
  handleStatusToggle,
}: Props) {
  const [open, setOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // 🔻 click outside close
  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(e.target as Node)
      ) {
        setOpen(false);
      }
    };

    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  const statusConfig = {
    "in-stock": {
      label: "In Stock",
      className: "bg-green-100 text-green-800",
    },
    "out-of-stock": {
      label: "Out of Stock",
      className: "bg-red-100 text-red-800",
    },
    "pre-order": {
      label: "Pre Order",
      className: "bg-yellow-100 text-yellow-800",
    },
  };

  return (
    <div className="relative w-full" ref={dropdownRef}>
      {/* Main Button */}
      <button
        onClick={() => setOpen((prev) => !prev)}
        className={`w-full px-3 py-2 rounded-lg text-sm font-semibold 
  transition-colors flex items-center justify-center 
  whitespace-nowrap truncate
  ${statusConfig[product.stockStatus as StockStatus]?.className}`}
      >
        {statusConfig[product.stockStatus as StockStatus]?.label}
      </button>

      {/* Dropdown */}
      {open && (
        <div className="absolute z-20 mt-2 w-30 rounded-lg border bg-white shadow-lg">
          {(Object.keys(statusConfig) as StockStatus[]).map((status) => (
            <button
              key={status}
              onClick={() => {
                handleStatusToggle(product._id, status);
                setOpen(false);
              }}
              className="w-full px-3 py-2 text-sm text-left 
  whitespace-nowrap truncate hover:bg-gray-100 hover:cursor-pointer"
            >
              {statusConfig[status].label}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
