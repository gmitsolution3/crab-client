import React from "react";
import Navbar from "../shared/navbar/page";
import Link from "next/link";
import CheckoutForm from "../components/checkoutForm";

const CheckOut = async ({ searchParams }: any) => {
  const { sku, qty } = await searchParams;
  console.log(sku, qty);

  return (
    <div className="bg-gray-100">
      <div>
        <Navbar />
      </div>
      <div className="flex max-w-400 mx-auto mt-2">
        <Link href="/">Home &gt;</Link>{" "}
        <Link href="/checkout" className="font-bold text-black ml-2">
          {" "}
          Checkout
        </Link>
      </div>
      <div className="flex max-w-400 mx-auto mt-2">
        <CheckoutForm />
      </div>
    </div>
  );
};

export default CheckOut;
