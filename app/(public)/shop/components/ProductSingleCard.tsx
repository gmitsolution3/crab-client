"use client";

import { memo, useMemo, useState } from "react";
import dynamic from "next/dynamic";

import Link from "next/link";
import Image from "next/image";

import {
  ShoppingCart,
  Heart,
  Eye,
} from "lucide-react";

import { FaWhatsapp } from "react-icons/fa";

import { createPortal } from "react-dom";

import { handleWhatsApp } from "./handleWhatsApp";

/**
 * Dynamic import
 * Huge bundle reduction
 */
const ProductVariant = dynamic(
  () => import("./ProductVariants"),
  {
    ssr: false,
  },
);

interface SingleProductCardProps {
  product: any;
}

export const SingleProductCard = memo(
  ({ product }: SingleProductCardProps) => {
    /**
     * ONLY necessary states
     */
    const [isCartModalOpen, setIsCartModalOpen] =
      useState(false);

    const [isBuyNow, setIsBuyNow] =
      useState(false);

    /**
     * Memoized calculations
     */
    const {
      discountedPrice,
      hasDiscount,
      discountLabel,
    } = useMemo(() => {
      const basePrice = Number(
        product.basePrice || 0,
      );

      const discountValue = Number(
        product?.discount?.value || 0,
      );

      const discountType =
        product?.discount?.type;

      let finalPrice = basePrice;

      if (discountType === "percentage") {
        finalPrice =
          basePrice -
          (basePrice * discountValue) / 100;
      }

      if (discountType === "flat") {
        finalPrice = Math.max(
          basePrice - discountValue,
          0,
        );
      }

      return {
        discountedPrice: Math.floor(finalPrice),
        hasDiscount: discountValue > 0,
        discountLabel:
          discountType === "percentage"
            ? `-${discountValue}%`
            : `-৳${discountValue}`,
      };
    }, [product]);

    /**
     * Product details for modal
     */
    const productDetails = useMemo(
      () => ({
        productPrice: discountedPrice,
        title: product.title,
        slug: product.slug,
        thumbnail: product.thumbnail,
      }),
      [discountedPrice, product],
    );

    return (
      <>
        <div className="group bg-white overflow-hidden border border-gray-200 hover:shadow-lg transition-shadow duration-300 relative">
          {/* IMAGE SECTION */}
          <div className="relative overflow-hidden">
            {/* Discount Badge */}
            {hasDiscount && (
              <div className="absolute top-3 left-3 z-20">
                <span className="bg-primary text-white text-xs font-semibold px-2.5 py-1">
                  {discountLabel}
                </span>
              </div>
            )}

            {/* Stock Badge */}
            {product.stockQuantity <= 10 && (
              <div className="absolute bottom-3 left-3 z-20">
                <span className="bg-orange-500 text-white text-xs font-semibold px-2.5 py-1">
                  Only {product.stockQuantity} left
                </span>
              </div>
            )}

            {/* QUICK ACTIONS */}
            <div className="absolute top-3 right-0 z-20 flex flex-col gap-1 translate-x-full group-hover:translate-x-0 transition-transform duration-300">
              <Link
                href={`/shop/${product.categoryId}/${product.slug}`}
                className="bg-white text-gray-700 p-2.5 hover:bg-primary hover:text-white transition-colors border-l border-t border-b border-gray-200"
              >
                <Eye className="w-4 h-4" />
              </Link>

              <button
                className="bg-white text-gray-700 p-2.5 hover:bg-red-500 hover:text-white transition-colors border-l border-b border-gray-200"
                aria-label="Wishlist"
              >
                <Heart className="w-4 h-4" />
              </button>

              <button
                onClick={() => handleWhatsApp(1)}
                className="bg-white text-gray-700 p-2.5 hover:bg-green-500 hover:text-white transition-colors border-l border-b border-gray-200"
                aria-label="WhatsApp"
              >
                <FaWhatsapp className="w-4 h-4" />
              </button>
            </div>

            {/* PRODUCT IMAGE */}
            <Link
              href={`/shop/${product.categoryId}/${product.slug}`}
              className="block relative"
            >
              <Image
                src={product.thumbnail}
                alt={product.title}
                width={400}
                height={400}
                loading="lazy"
                sizes="
                  (max-width: 640px) 50vw,
                  (max-width: 1024px) 33vw,
                  25vw
                "
                className="w-full h-[260px] md:h-[320px] object-cover transition-transform duration-300 group-hover:scale-[1.02]"
              />
            </Link>

            {/* ADD TO CART */}
            <div className="absolute bottom-0 left-0 right-0 translate-y-full group-hover:translate-y-0 transition-transform duration-300">
              <button
                onClick={() => {
                  setIsBuyNow(false);
                  setIsCartModalOpen(true);
                }}
                className="w-full bg-primary text-white py-3 text-sm font-semibold hover:bg-primary/90 transition-colors flex items-center justify-center gap-2"
              >
                <ShoppingCart className="w-4 h-4" />
                কার্টে এড করুন
              </button>
            </div>
          </div>

          {/* CONTENT */}
          <div className="p-4">
            {/* CATEGORY */}
            <div className="text-xs text-gray-500 uppercase tracking-wide mb-1">
              {product.category}
            </div>

            {/* TITLE */}
            <h3 className="text-gray-900 font-medium mb-2 line-clamp-2 leading-relaxed min-h-[56px] hover:text-primary transition-colors text-base md:text-lg">
              <Link
                href={`/shop/${product.categoryId}/${product.slug}`}
              >
                {product.title}
              </Link>
            </h3>

            {/* PRICE */}
            <div className="flex items-center gap-2 mb-4">
              <span className="text-lg font-bold text-gray-900">
                ৳
                {discountedPrice ||
                  product.basePrice}
              </span>

              {hasDiscount && (
                <span className="text-sm text-gray-400 line-through">
                  ৳{product.basePrice}
                </span>
              )}
            </div>

            {/* BOTTOM ACTIONS */}
            <div className="flex gap-2">
              <button
                onClick={() => {
                  setIsBuyNow(true);
                  setIsCartModalOpen(true);
                }}
                className="flex-1 bg-primary text-white py-2 text-xs font-semibold hover:bg-primary/90 transition-colors"
              >
                অর্ডার করুন
              </button>

              <button
                onClick={() => handleWhatsApp(1)}
                className="bg-green-500 text-white px-3 py-2 text-xs hover:bg-green-600 transition-colors"
                aria-label="WhatsApp"
              >
                <FaWhatsapp className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* STOCK BAR */}
          <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-gray-100">
            <div
              className="h-full bg-primary"
              style={{
                width: `${Math.min(
                  (product.stockQuantity / 50) *
                    100,
                  100,
                )}%`,
              }}
            />
          </div>
        </div>

        {/* MODAL */}
        {isCartModalOpen &&
          createPortal(
            <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
              <div className="bg-white w-full max-w-md p-6 relative rounded-lg">
                {/* CLOSE */}
                <button
                  onClick={() =>
                    setIsCartModalOpen(false)
                  }
                  className="absolute top-3 right-3 text-gray-500 hover:text-black text-2xl leading-none"
                  aria-label="Close"
                >
                  ×
                </button>

                <h2 className="text-lg font-semibold mb-2">
                  অর্ডার করুন
                </h2>

                <p className="text-sm text-gray-600 mb-4">
                  {product.title}
                </p>

                <ProductVariant
                  variants={product.variants}
                  from="cardButton"
                  productDetails={
                    productDetails
                  }
                  onCloseModal={() =>
                    setIsCartModalOpen(false)
                  }
                  isBuyNow={isBuyNow}
                  product={product}
                />
              </div>
            </div>,
            document.body,
          )}
      </>
    );
  },
);

SingleProductCard.displayName =
  "SingleProductCard";