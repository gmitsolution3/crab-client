export const getAllOrder = async () => {
  const res = await fetch(
    `${process.env.NEXT_EXPRESS_SERVER_BASE_URL}/create-order/all-product`,
    {
      next: { revalidate: 300 },
    }
  );

  return res.json();
};

export const getOrderById = async (id: string) => {
  const res = await fetch(
    `${process.env.NEXT_EXPRESS_SERVER_BASE_URL}/create-order/get-Order/${id}`,
    {
      next: { revalidate: 300 },
    }
  );

  return res.json();
};
