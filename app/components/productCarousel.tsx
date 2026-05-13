"use client";

import { memo } from "react";

import { ProductFormData } from "@/utils/product";

import {
  Swiper,
  SwiperSlide,
} from "swiper/react";

import {
  Navigation,
  Virtual,
} from "swiper/modules";

import "swiper/css";
//@ts-ignore
import "swiper/css/navigation";

import { SingleProductCard } from "../(public)/shop/components/ProductSingleCard";

interface ProductCarouselProps {
  products: ProductFormData[];
  topSelling?: string;
}

const ProductCarousel = ({
  products,
  topSelling,
}: ProductCarouselProps) => {
  if (!products?.length) return null;

  /**
   * Unique IDs
   * prevents navigation conflicts
   */
  const uniqueId = topSelling
    ? "top-selling"
    : "featured";

  const nextButtonId = `carousel-next-${uniqueId}`;
  const prevButtonId = `carousel-prev-${uniqueId}`;

  return (
    <section className="w-full py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* HEADER */}
        <div className="mb-10">
          <h2 className="text-3xl md:text-4xl font-semibold text-center text-gray-900 mb-2 uppercase">
            {topSelling
              ? "Top Selling Products"
              : "Featured Products"}
          </h2>

          <p className="text-gray-600 text-center">
            {topSelling
              ? "Check out our latest top selling products and bestsellers."
              : "Check out our latest products and bestsellers."}
          </p>
        </div>

        {/* SLIDER */}
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
              disabledClass:
                "opacity-30 cursor-not-allowed",
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
              <SwiperSlide
                key={product._id}
                virtualIndex={index}
              >
                <div className="h-full pb-8 pt-2">
                  <MemoizedSingleProductCard
                    product={product}
                  />
                </div>
              </SwiperSlide>
            ))}
          </Swiper>

          {/* PREV BUTTON */}
          <button
            id={prevButtonId}
            className="absolute left-0 lg:-left-10 top-1/2 z-10 -translate-y-1/2 -translate-x-4 rounded-full bg-white p-3 shadow-lg transition-all duration-300 hover:bg-gray-50"
            aria-label="Previous slide"
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

          {/* NEXT BUTTON */}
          <button
            id={nextButtonId}
            className="absolute right-0 lg:-right-10 top-1/2 z-10 -translate-y-1/2 translate-x-4 rounded-full bg-white p-3 shadow-lg transition-all duration-300 hover:bg-gray-50"
            aria-label="Next slide"
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
      </div>
    </section>
  );
};

const MemoizedSingleProductCard =
  memo(SingleProductCard);

export default memo(ProductCarousel);