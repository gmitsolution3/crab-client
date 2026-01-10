export const getFacebookPixelCredential = async () => {
    const res = await fetch(
      `${process.env.NEXT_EXPRESS_SERVER_BASE_URL}/facebook-setting/credentials`,
      {
        next: { revalidate: 300 },
      }
    );
    return res.json();
}