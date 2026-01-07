"use client";

import { ProductFormData } from "@/utils/product";
import Image from "next/image";
import Link from "next/link";
import React, { useState, useEffect } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { CardButtons } from "./cardButtons";

interface GroupedProducts {
  [categoryName: string]: ProductFormData[];
}

const ProductCard = ({ products }: { products: ProductFormData[] }) => {
  const groupedProducts: GroupedProducts = products.reduce((acc, pro) => {
    const catName = pro.category;
    if (!acc[catName]) acc[catName] = [];
    acc[catName].push(pro);
    return acc;
  }, {} as GroupedProducts);

  return (
    <div className="w-full space-y-16 py-8 px-3">
      {Object.entries(groupedProducts).map(
        ([categoryName, categoryProducts]) => (
          <CategoryCarousel
            key={categoryName}
            categoryName={categoryName}
            products={categoryProducts}
          />
        )
      )}
    </div>
  );
};

// Carousel for each category
const CategoryCarousel = ({
  categoryName,
  products,
}: {
  categoryName: string;
  products: ProductFormData[];
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [visibleCards, setVisibleCards] = useState(4);

  const updateVisibleCards = () => {
    const width = window.innerWidth;
    if (width < 640) setVisibleCards(2);
    else if (width < 1024) setVisibleCards(3);
    else setVisibleCards(4);
  };

  useEffect(() => {
    updateVisibleCards();
    window.addEventListener("resize", updateVisibleCards);
    return () => window.removeEventListener("resize", updateVisibleCards);
  }, []);

  const handlePrev = () => {
    setCurrentIndex((prev) =>
      prev <= 0 ? Math.max(products.length - visibleCards, 0) : prev - 1
    );
  };

  const handleNext = () => {
    setCurrentIndex((prev) =>
      prev + visibleCards >= products.length ? 0 : prev + 1
    );
  };

  if (products.length === 0) return null;

  return (
    <section className="w-full">
      <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-gray-900 mb-8 text-center md:text-left">
        {categoryName}
      </h2>

      {/* Carousel */}
      <div className="relative">
        <div className="overflow-hidden rounded-xl">
          <div
            className="flex transition-transform duration-500 ease-in-out"
            style={{
              transform: `translateX(-${(currentIndex * 100) / visibleCards}%)`,
            }}
          >
            {products.map((pro) => {
              const discountedPrice =
                pro.discount.type === "percentage"
                  ? Math.floor(
                      Number(pro.basePrice) -
                        (Number(pro.basePrice) * Number(pro.discount.value)) /
                          100
                    )
                  : Math.max(
                      Number(pro.basePrice) - Number(pro.discount.value),
                      0
                    );

              return (
                <div
                  key={pro._id}
                  className="shrink-0 px-3"
                  style={{ width: `${100 / visibleCards}%` }}
                >
                  <div className="rounded-xl border border-gray-200 bg-white hover:shadow-xl hover:border-blue-700 transition-all duration-300 overflow-hidden h-full flex flex-col">
                    <Link
                      href={`/shop/${pro.categoryId}/${pro.slug}`}
                      className="flex flex-col grow"
                    >
                      <div className="relative h-56 md:h-64 overflow-hidden bg-linear-to-br from-gray-900 to-gray-700">
                        <Image
                          src={
                            typeof pro.thumbnail === "string"
                              ? pro.thumbnail
                              : ""
                          }
                          alt={pro.title}
                          fill
                          className="object-cover transition-transform duration-500 hover:scale-105"
                        />
                      </div>

                      <div className="p-4 space-y-3 flex flex-col grow">
                        <h3 className="font-semibold text-base md:text-lg text-gray-900 line-clamp-2">
                          {pro.title}
                        </h3>
                        <p className="text-xs md:text-sm text-gray-600 line-clamp-3 grow">
                          {pro.shortDescription}
                        </p>

                        <div className="flex items-center gap-3">
                          <span className="text-lg md:text-xl font-bold text-gray-900">
                            {discountedPrice}৳
                          </span>
                          {Number(pro.discount.value) > 0 && (
                            <span className="text-sm md:text-base text-red-500 line-through">
                              {pro.basePrice}৳
                            </span>
                          )}
                        </div>
                      </div>
                    </Link>

                    <div className="px-2 border-t border-gray-100 mt-auto">
                      <CardButtons product={pro} />
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Arrows - Desktop/Tablet */}
        <button
          onClick={handlePrev}
          className="absolute left-0 md:left-4 top-1/2 -translate-y-1/2 w-10 h-10 md:w-12 md:h-12 bg-white/90 hover:bg-white rounded-full shadow-lg items-center justify-center z-10 hidden md:flex"
          aria-label="Previous"
        >
          <ChevronLeft className="w-6 h-6 text-gray-800" />
        </button>

        <button
          onClick={handleNext}
          className="absolute right-0 md:right-4 top-1/2 -translate-y-1/2 w-10 h-10 md:w-12 md:h-12 bg-white/90 hover:bg-white rounded-full shadow-lg flex items-center justify-center z-10 md:flex"
          aria-label="Next"
        >
          <ChevronRight className="w-6 h-6 text-gray-800" />
        </button>

        {/* Dots - Mobile */}
        <div className="flex justify-center mt-6 gap-2 md:hidden">
          {Array.from({
            length: Math.ceil(products.length / visibleCards),
          }).map((_, i) => (
            <button
              key={i}
              onClick={() => setCurrentIndex(i * visibleCards)}
              className={`h-2 rounded-full transition-all duration-300 ${
                Math.floor(currentIndex / visibleCards) === i
                  ? "bg-blue-600 w-8"
                  : "bg-gray-300 w-2"
              }`}
            />
          ))}
        </div>
      </div>
      {/* <div className="w-full flex justify-center">
        <div className="max-w-50 border border-[#0970B4] text-[#0970B4] text-center mt-2 rounded-lg text-lg cursor-pointer hover:bg-[#0970B4] font-bold hover:text-white transition py-4 px-4 ">
          See All Products
        </div>
      </div> */}
    </section>
  );
};

export default ProductCard;
