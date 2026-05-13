export async function getBanner() {
  const result = await fetch(
    `${process.env.NEXT_PUBLIC_EXPRESS_SERVER_BASE_URL}/banner`,
    {
      next: { revalidate: 300 },
    },
  ).then((res) => res.json());

  return result;
}