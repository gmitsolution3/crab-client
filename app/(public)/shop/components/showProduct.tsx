"use client";

import { memo } from "react";

import { ProductFormData } from "@/utils/product";

import { Navigation, Virtual } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";

import "swiper/css";
//@ts-ignore
import "swiper/css/navigation";

import { SingleProductCard } from "./ProductSingleCard";

interface GroupedProducts {
  [categoryName: string]: ProductFormData[];
}

interface ProductCardProps {
  groupedProducts: GroupedProducts;
}

interface CategoryCarouselProps {
  categoryName: string;
  products: ProductFormData[];
}

/**
 * =========================
 * MAIN COMPONENT
 * =========================
 */

const ProductCard = ({ groupedProducts }: ProductCardProps) => {
  /**
   * Initial render limitation
   * Huge performance improvement
   */
  const visibleCategories = Object.entries(groupedProducts).slice(
    0,
    2,
  );

  return (
    <div className="w-full space-y-16 py-8 px-3">
      {visibleCategories.map(([categoryName, categoryProducts]) => (
        <MemoizedCategoryCarousel
          key={categoryName}
          categoryName={categoryName}
          products={categoryProducts}
        />
      ))}
    </div>
  );
};

/**
 * =========================
 * CATEGORY CAROUSEL
 * =========================
 */

const CategoryCarousel = ({
  categoryName,
  products,
}: CategoryCarouselProps) => {
  if (!products.length) return null;

  /**
   * Unique navigation IDs
   */
  const safeCategoryName = categoryName
    .replace(/\s+/g, "")
    .replace(/'/g, "")
    .toLowerCase();

  const nextButtonId = `custom-next-${safeCategoryName}`;
  const prevButtonId = `custom-prev-${safeCategoryName}`;

  return (
    <section className="w-full">
      {/* Heading */}
      <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-gray-900 mb-8 text-center md:text-left uppercase">
        {categoryName}
      </h2>

      {/* Slider */}
      <div className="relative">
        <Swiper
          modules={[Navigation, Virtual]}
          virtual
          loop={false}
          watchSlidesProgress
          observer={false}
          observeParents={false}
          slidesPerView={2}
          spaceBetween={10}
          navigation={{
            nextEl: `#${nextButtonId}`,
            prevEl: `#${prevButtonId}`,
            disabledClass: "opacity-30 cursor-not-allowed",
          }}
          breakpoints={{
            640: {
              slidesPerView: 2,
              spaceBetween: 20,
            },
            768: {
              slidesPerView: 3,
              spaceBetween: 25,
            },
            1024: {
              slidesPerView: 3,
              spaceBetween: 30,
            },
            1280: {
              slidesPerView: 4,
              spaceBetween: 40,
            },
          }}
        >
          {products.map((product, index) => (
            <SwiperSlide key={product._id} virtualIndex={index}>
              <div className="pb-8 pt-2">
                <MemoizedSingleProductCard product={product} />
              </div>
            </SwiperSlide>
          ))}
        </Swiper>

        {/* Previous Button */}
        <button
          id={prevButtonId}
          className="absolute left-0 lg:-left-10 top-1/2 z-10 -translate-y-1/2 -translate-x-4 rounded-full bg-white p-3 shadow-lg transition-all duration-300 hover:bg-gray-50"
          aria-label={`Previous ${categoryName} products`}
        >
          <svg
            className="h-5 w-5 text-gray-700 md:h-6 md:w-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M15 19l-7-7 7-7"
            />
          </svg>
        </button>

        {/* Next Button */}
        <button
          id={nextButtonId}
          className="absolute right-0 lg:-right-10 top-1/2 z-10 -translate-y-1/2 translate-x-4 rounded-full bg-white p-3 shadow-lg transition-all duration-300 hover:bg-gray-50"
          aria-label={`Next ${categoryName} products`}
        >
          <svg
            className="h-5 w-5 text-gray-700 md:h-6 md:w-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M9 5l7 7-7 7"
            />
          </svg>
        </button>
      </div>
    </section>
  );
};

/**
 * =========================
 * MEMOIZED COMPONENTS
 * =========================
 */

const MemoizedCategoryCarousel = memo(CategoryCarousel);

const MemoizedSingleProductCard = memo(SingleProductCard);

export default memo(ProductCard);
