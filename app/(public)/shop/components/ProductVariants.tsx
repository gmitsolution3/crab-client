"use client";

import { Minimize, Minus, Plus, ShoppingCart } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { FaWhatsapp } from "react-icons/fa";

type Variant = {
  attributes: {
    color: string;
    colorHex?: string;
    size: string;
  };
  sku: string;
  stock: number;
};

type Props = {
  variants: Variant[];
};


// function that cover color name to hex code
function resolveColorFromName(colorName: string): string {
  const name = colorName.toLowerCase().trim();

  if (name.includes("black")) return "#000000";
  if (name.includes("white")) return "#ffffff";
  if (name.includes("blue")) return "#2563eb";
  if (name.includes("red")) return "#dc2626";
  if (name.includes("green")) return "#16a34a";
  if (name.includes("orange")) return "#f97316";
  if (name.includes("yellow")) return "#facc15";
  if (name.includes("pink")) return "#ec4899";
  if (name.includes("purple")) return "#9333ea";
  if (name.includes("silver")) return "#d1d5db";
  if (name.includes("gray") || name.includes("grey")) return "#9ca3af";
  if (name.includes("gold")) return "#f59e0b";

  return "#cccccc"; 
}


// if hex code exit than return the hex code form here otherwise resolveColorFromName function call

function resolveColor(color: string, hex?: string) {
  if (hex) return hex;
  return resolveColorFromName(color);
}



export default function ProductVariant({ variants }: Props) {

    const router = useRouter()

  // catch out all the color exit in the variants
  const colors = Array.from(
    new Map(
      variants.map((v) => [
        v.attributes.color,
        { name: v.attributes.color, hex: v.attributes.colorHex },
      ])
    ).values()
  );

  //   catch the available size in the variants
  const sizes = [...new Set(variants.map((v) => v.attributes.size))];

  const [selectedColor, setSelectedColor] = useState(colors[0]);
  const [selectedSize, setSelectedSize] = useState(sizes[0]);
  const [quantity, setQuantity] = useState(1);

  //   increase or decrease the quantity of product
  const handleIncrease = () => setQuantity((prev) => prev + 1);
  const handleDecrease = () => setQuantity((prev) => (prev > 1 ? prev - 1 : 1));

  //   here open the add card modal
  const handleAddToCart = () => {
    alert(`Added ${quantity} item(s) to cart`);
  };

  // redirect on the what 's app
  const handleOrderWhatsApp = () => {
    const phoneNumber = "8801234567890"; // replace with your number
    const message = `I want to order ${quantity} item(s)`;
    window.open(
      `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`,
      "_blank"
    );
  };

  //   redirect the checkout page from here
  const handleBuyNow = () => {
    if (!selectedVariant) return alert("Please select a variant first!");

    const checkoutUrl = `/checkout?sku=${sku}&qty=${quantity}`;

    router.push(checkoutUrl);
    // alert(`Buying ${quantity} item(s) now`);
  };

  //   function  normalize
  function normalize(value: string) {
    return value.toLowerCase().trim() || "";
  }

  //   whole color change and depend on that change the sku and availability
  const handleColorChange = (colorObj: {
    name: string;
    hex: string | undefined;
  }) => {
    setSelectedColor(colorObj);

    const firstAvailableVariantForColor = variants.find(
      (v) => normalize(v.attributes.color) === normalize(colorObj.name)
    );

    if (firstAvailableVariantForColor) {
      setSelectedSize(firstAvailableVariantForColor.attributes.size);
    }
  };

//   variant selected fun
  const selectedVariant = variants.find(
    (v) =>
      normalize(v.attributes.color) === normalize(selectedColor.name) &&
      normalize(v.attributes.size) === normalize(selectedSize)
  );

//   condition for display the stock
  const availabilityText = selectedVariant
    ? selectedVariant.stock < 5
      ? "Stock almost finished"
      : "In Stock"
    : "Unavailable";

    // check the sku is exit or not 
  const sku = selectedVariant?.sku ?? "N/A";


//   main components
  return (
    <div className="space-y-2">
      <div className="flex">
        <h2>
          Availability:{" "}
          <span className="font-semibold">{availabilityText}</span>
        </h2>
        <h2>
          {selectedVariant && (
            <span className="ml-3 text-gray-500">
              <strong>Code:</strong> <span className="font-medium">{sku}</span>
            </span>
          )}
        </h2>
      </div>

      {/* COLOR */}
      <div className="rounded-lg bg-white border border-gray-200 p-4">
        <p className="mb-3 text-sm font-medium">
          Color: <span className="font-semibold">{selectedColor.name}</span>
        </p>

        <div className="flex flex-wrap gap-3">
          {colors.map((color) => {
            const bgColor = resolveColor(color.name, color.hex);

            return (
              <button
                key={color.name}
                onClick={() => handleColorChange(color)}
                className={`flex items-center gap-2 rounded-full border px-4 py-2 text-sm transition
                  ${
                    selectedColor.name === color.name
                      ? "border-[#0970B4] ring-1 ring-[#0970B4]"
                      : "border-gray-300"
                  }`}
              >
                <span
                  className="h-4 w-4 rounded-full border"
                  style={{ backgroundColor: bgColor }}
                />
                {color.name}
              </button>
            );
          })}
        </div>
      </div>

      {/* SIZE */}
      <div>
        <p className="mb-2 text-sm font-medium">
          Size:{" "}
          <span className="font-semibold">{selectedSize.toUpperCase()}</span>
        </p>

        <div className="flex flex-wrap gap-2">
          {sizes.map((size) => (
            <button
              key={size}
              onClick={() => setSelectedSize(size)}
              className={`rounded-md border px-4 py-2 text-sm capitalize transition
                ${
                  selectedSize === size
                    ? "border-black bg-black text-white"
                    : "border-gray-300"
                }`}
            >
              {size}
            </button>
          ))}
        </div>
      </div>
      <div className="grid grid-cols-2 gap-4 mt-4">
        {/* Quantity selector */}
        <div className="flex items-center justify-center border rounded-lg border-gray-400 bg-blue-50">
          <button
            onClick={handleDecrease}
            className="px-4 py-1 text-2xl font-bold hover:bg-gray-100 rounded-l-lg"
          >
            <Minus />
          </button>
          <span className="px-6 border border-blue-400 rounded-lg bg-white">
            {quantity}
          </span>
          <button
            onClick={handleIncrease}
            className="px-4 py-1 text-2xl font-bold hover:bg-gray-100 rounded-r-lg"
          >
            <Plus />
          </button>
        </div>

        {/* Buttons */}
        <button
          onClick={handleAddToCart}
          className="px-4 py-2 border border-blue-500 text-blue-500 rounded-lg hover:bg-blue-50 flex items-center gap-2"
        >
          <ShoppingCart className="text-blue-600" /> ADD TO CART
        </button>

        <button
          onClick={handleOrderWhatsApp}
          className="w-full bg-linear-to-t from-[#073d19] to-[#09b442] hover:from-[#09b442] hover:to-[#073d19] hover:cursor-pointer text-white py-3 rounded-lg font-semibold flex items-center justify-center text-sm gap-2 hover:bg-green-700 transition"
        >
          <FaWhatsapp />
          ORDER VIA WHATSAPP
        </button>
        <button
          onClick={handleBuyNow}
          className="block w-full border-b border-b-gray-100 px-4 py-3 text-sm text-center bg-linear-to-t from-[#0970B4] to-[#3CB1FF] font-semibold hover:cursor-pointer text-white rounded-lg hover:from-[#3CB1FF] hover:to-[#0970B4]"
        >
          BUY NOW
        </button>
      </div>
    </div>
  );
}
