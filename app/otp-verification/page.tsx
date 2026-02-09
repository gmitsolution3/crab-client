import React from "react";
import OTPVerificationWrapper from "./components/VarificationWapper";
import { SupportNav } from "../support/components/supportNavbar";

const OTPVerificationMain = async({
  searchParams,
}: {
  searchParams: { orderId?: string };
}) => {
  const { orderId } =await searchParams;

  console.log({ orderId: orderId });

  return (
    <section className="min-h-screen bg-gray-100">
      <nav className="sticky top-0 z-50">
        <SupportNav />
      </nav>
      <OTPVerificationWrapper orderId={orderId} />
    </section>
  );
};

export default OTPVerificationMain;
