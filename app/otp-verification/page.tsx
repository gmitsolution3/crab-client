import React from "react";
import OTPVerificationWrapper from "./components/VarificationWapper";
import { SupportNav } from "../support/components/supportNavbar";

const OTPVerificationMain = async ({
  searchParams,
}: {
  searchParams: Promise<{
    orderId?: string;
    amount: string;
    paymentMethod: string;
  }>;
}) => {
  const { orderId, amount, paymentMethod } = await searchParams;

  return (
    <section className="min-h-screen bg-gray-100">
      <nav className="sticky top-0 z-50">
        <SupportNav />
      </nav>
      <OTPVerificationWrapper
        orderId={orderId}
        amount={amount}
        paymentMethod={paymentMethod}
      />
    </section>
  );
};

export default OTPVerificationMain;
