import axios from "axios";

export const makePayment = async (data: any) => {
  const res = await axios.post(
    `${process.env.NEXT_PUBLIC_EXPRESS_SERVER_BASE_URL}/payment/create-payment`,
    data,
  );

  if (typeof window !== "undefined") {
    window.location.href = res.data.data.bkashURL;
  }

  return await res.data;
};
