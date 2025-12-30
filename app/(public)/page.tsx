import { ProductCard } from "./shop/components/productCard";

const MainPage = async () => {
  const res = await fetch("http://localhost:5000/api/products", {
    next: { revalidate: 60 },
    // cache: "no-store"
  });
  const result = await res.json();

  const products = result.data;


  if (products.length === 0) {
    return (
      <div className="min-h-screen flex justify-center items-center text-3xl text-blue-800">
        no data found
      </div>
    );
  }

  return (
    <div className="bg-white p-4 rounded-xl">
      <ProductCard products={products} />
    </div>
  );
};

export default MainPage;
