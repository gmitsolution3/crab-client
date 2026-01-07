"use client";

import React, { useState, useEffect } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import Link from "next/link";
import { CardButtons } from "../(public)/shop/components/cardButtons";

interface Product {
  _id: string;
  title: string;
  shortDescription: string;
  thumbnail: string;
}

const ProductCarousel = ({ products }: { products: any }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [visibleCards, setVisibleCards] = useState(3); // default 3

  // Update visible cards based on screen width
  const updateVisibleCards = () => {
    const width = window.innerWidth;
    if (width < 640) setVisibleCards(1);
    else if (width < 1024) setVisibleCards(2);
    else setVisibleCards(3);
  };

  useEffect(() => {
    updateVisibleCards();
    window.addEventListener("resize", updateVisibleCards);
    return () => window.removeEventListener("resize", updateVisibleCards);
  }, []);

  const handlePrev = () => {
    setCurrentIndex((prev) =>
      prev === 0 ? products.length - visibleCards : prev - 1
    );
  };

  const handleNext = () => {
    setCurrentIndex((prev) =>
      prev + visibleCards >= products.length ? 0 : prev + 1
    );
  };

  return (
    <div className="w-full py-12 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Title */}
        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2 text-center">
          Featured Products
        </h2>
        <p className="text-gray-600 text-center mb-8">
          Check out our latest products and bestsellers.
        </p>

        <div className="relative">
          {/* Carousel Items */}
          <div className="overflow-hidden">
            <div
              className="flex transition-transform duration-500 justify-center"
              style={{
                transform: `translateX(-${
                  (currentIndex * 100) / visibleCards
                }%)`,
                width: `${(products.length * 100) / visibleCards}%`,
              }}
            >
              {products.map((product: any) => (
                <Link
                  href={`/shop/${product.categoryId}/${product.slug}`}
                  key={product._id}
                  className="shrink-0 w-full sm:w-1/2 lg:w-1/3 px-2 "
                >
                  <div>
                    <div className="bg-white rounded-lg overflow-hidden shadow-md hover:shadow-xl h-full flex flex-col">
                      <div className="relative w-full h-48 md:h-56">
                        <img
                          src={product.thumbnail}
                          alt={product.title}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div className="p-4 flex flex-col grow">
                        <h3 className="text-base md:text-lg font-semibold mb-2">
                          {product.title}
                        </h3>
                        <p className="text-xs text-gray-600">
                          {product.shortDescription}
                        </p>
                      </div>
                      <div className="p-3">
                        <CardButtons product={product} />
                      </div>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>

          {/* Left Arrow */}
          <button
            onClick={handlePrev}
            className="absolute top-1/2 -translate-y-1/2 left-0 w-10 h-10 md:w-12 md:h-12 rounded-full bg-white shadow flex items-center justify-center z-10"
          >
            <ChevronLeft className="w-6 h-6 text-gray-700" />
          </button>

          {/* Right Arrow */}
          <button
            onClick={handleNext}
            className="absolute top-1/2 -translate-y-1/2 right-0 w-10 h-10 md:w-12 md:h-12 rounded-full bg-white shadow flex items-center justify-center z-10"
          >
            <ChevronRight className="w-6 h-6 text-gray-700" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductCarousel;
