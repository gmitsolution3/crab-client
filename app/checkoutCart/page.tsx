"use client";

import React, { useEffect, useState } from "react";
import Navbar from "../shared/navbar/page";
import { ComLogo } from "../shared/components/ComLogo";
import { getCart } from "@/utils/cartStorage";
import CheckoutCartTable from "../components/checkoutCartTable";

const CheckoutCart = () => {
  const [cartData, setCartData] = useState([]);

  useEffect(() => {
    const updateCart = () => {
      setCartData(getCart());
    };

    updateCart();

    window.addEventListener("cart_updated", updateCart);

    return () => {
      window.removeEventListener("cart_updated", updateCart);
    };
  }, []);

  return (
    <div>
      <nav className="min-h-30 bg-gray-200 w-full flex justify-center items-center">
        <div className="p-4 rounded-xl bg-white">
          <ComLogo />
        </div>
      </nav>

      {cartData === undefined || cartData.length === 0 ? (
        <div className="min-h-screen flex justify-center items-center text-blue-700 text-2xl">
          No Data found
        </div>
      ) : (
        <section>
          <CheckoutCartTable products={cartData} />
        </section>
      )}
    </div>
  );
};

export default CheckoutCart;
