export async function getHomeData() {
  const res = await fetch(
    `${process.env.NEXT_EXPRESS_SERVER_BASE_URL}/api/v1/home`,
    {
      cache: "no-store",
    },
  );

  return (await res.json()).data;
}