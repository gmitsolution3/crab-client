"use client";

import { getCart } from "@/utils/cartStorage";
import { ShoppingCart } from "lucide-react";
import Link from "next/link";
import React, { useEffect, useState } from "react";

export const BookCard = () => {
  const [cartCount, setCartCount] = useState(0);

  useEffect(() => {
    const updateCart = () => {
      setCartCount(getCart().length);
    };

    updateCart();

    window.addEventListener("cart_updated", updateCart);

    return () => {
      window.removeEventListener("cart_updated", updateCart);
    };
  }, []);
  return (
    <Link href={`/checkoutCart`}>
      <div className="border border-gray-300 rounded-md bg-[#FEE2E2] px-3 py-2 flex gap-2">
        <ShoppingCart className="text-red-600" />{" "}
        <span className="text-red-600">{cartCount}</span>
      </div>
    </Link>
  );
};
