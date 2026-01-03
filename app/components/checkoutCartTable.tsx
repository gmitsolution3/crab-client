import React, { useState } from "react";
import { Trash2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { updateCartItems } from "@/utils/cartStorage";
import Link from "next/link";

interface CheckoutProduct {
  productPrice: number;
  quantity: number;
  selectedColor: { name: string };
  selectedProductSize: string;
  selectedVariant: {
    attributes: { color: string; size: string };
    sku: string;
    stock: number;
  };
  sku: string;
  slug: string;
  thumbnail: string;
  title: string;
}

export default function CheckoutCartTable({
  products,
}: {
  products: CheckoutProduct[];
}) {
  const [cartItems, setCartItems] = useState<CheckoutProduct[]>(products);
  const router = useRouter();

  const handleQuantityChange = (index: number, newQuantity: number) => {
    if (newQuantity < 1) return;

    const updatedItems = [...cartItems];
    updatedItems[index].quantity = newQuantity;

    setCartItems(updatedItems);
    updateCartItems(updatedItems);
    console.log(updatedItems);

    console.log("get form the localhost", products);
  };

  const handleRemoveItem = (index: number) => {
    const updatedItems = cartItems.filter((_, i) => i !== index);
    setCartItems(updatedItems);

    // sync localStorage immediately
    updateCartItems(updatedItems);
  };

  const getTotalPrice = (item: any) => {
    return (item.productPrice * item.quantity).toLocaleString("en-BD");
  };

  const handleGoCheckout = () => {
    
    const normalizedCart = cartItems.map((item) => ({
      ...item,
      quantity: Number(item.quantity),
    }));

    updateCartItems(normalizedCart);
    router.push("/checkout");
  };

  return (
    <div className="w-full min-h-screen bg-gray-100 p-4 md:p-8">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-2xl md:text-3xl font-bold text-gray-800 mb-6">
          Shopping Cart
        </h1>

        {cartItems.length === 0 ? (
          <div className="bg-white rounded-lg p-8 text-center">
            <p className="text-gray-600 text-lg">Your cart is empty</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full bg-white rounded-lg shadow-md overflow-hidden">
              <thead className="bg-gray-100 border-b border-gray-300">
                <tr>
                  <th className="px-3 md:px-6 py-3 text-left text-xs md:text-sm font-semibold text-gray-700">
                    Product
                  </th>
                  <th className="px-3 md:px-6 py-3 text-left text-xs md:text-sm font-semibold text-gray-700">
                    Price
                  </th>
                  <th className="px-3 md:px-6 py-3 text-left text-xs md:text-sm font-semibold text-gray-700">
                    Quantity
                  </th>
                  <th className="px-3 md:px-6 py-3 text-left text-xs md:text-sm font-semibold text-gray-700">
                    Total
                  </th>
                  <th className="px-3 md:px-6 py-3 text-center text-xs md:text-sm font-semibold text-gray-700">
                    Action
                  </th>
                </tr>
              </thead>
              <tbody>
                {cartItems.map((item, index) => (
                  <tr
                    key={index}
                    className="border-b border-gray-200 hover:bg-gray-50"
                  >
                    {/* Product Info */}
                    <td className="px-3 md:px-6 py-4">
                      <div className="flex flex-col md:flex-row md:items-center gap-3">
                        <img
                          src={item.thumbnail}
                          alt={item.title}
                          className="w-16 h-16 md:w-20 md:h-20 object-cover rounded-lg"
                        />
                        <div className="flex-1">
                          <p className="font-semibold text-sm md:text-base text-gray-800">
                            {item.title}
                          </p>
                          <p className="text-xs text-gray-600 mt-1">
                            Color:{" "}
                            <span className="font-medium">
                              {item.selectedColor.name}
                            </span>
                          </p>
                          <p className="text-xs text-gray-600">
                            Size:{" "}
                            <span className="font-medium">
                              {item.selectedProductSize}
                            </span>
                          </p>
                        </div>
                      </div>
                    </td>

                    {/* Price */}
                    <td className="px-3 md:px-6 py-4">
                      <p className="text-sm md:text-base font-semibold text-gray-800">
                        ৳ {item.productPrice}
                      </p>
                    </td>

                    {/* Quantity */}
                    <td className="px-3 md:px-6 py-4">
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() =>
                            handleQuantityChange(index, item.quantity - 1)
                          }
                          className="w-7 h-7 md:w-8 md:h-8 flex items-center justify-center bg-gray-200 rounded hover:bg-gray-300 text-sm font-semibold"
                        >
                          −
                        </button>
                        <input
                          type="number"
                          value={item.quantity}
                          onChange={(e) => {
                            const value = parseInt(e.target.value) || 1;
                            if (value >= 1) handleQuantityChange(index, value);
                          }}
                          className="w-10 md:w-12 text-center border border-gray-300 rounded py-1 text-sm font-semibold"
                        />
                        <button
                          onClick={() =>
                            handleQuantityChange(index, item.quantity + 1)
                          }
                          className="w-7 h-7 md:w-8 md:h-8 flex items-center justify-center bg-gray-200 rounded hover:bg-gray-300 text-sm font-semibold"
                        >
                          +
                        </button>
                      </div>
                    </td>

                    {/* Total */}
                    <td className="px-3 md:px-6 py-4">
                      <p className="text-sm md:text-base font-bold text-gray-800">
                        ৳ {getTotalPrice(item)}
                      </p>
                    </td>

                    {/* Remove Button */}
                    <td className="px-3 md:px-6 py-4">
                      <button
                        onClick={() => handleRemoveItem(index)}
                        className="flex items-center justify-center gap-1 text-red-500 hover:text-red-700 transition-colors text-xs md:text-sm font-semibold"
                      >
                        <Trash2 size={16} />
                        <span className="hidden md:inline">Remove</span>
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {/* Cart Summary */}
        {cartItems.length > 0 && (
          <div className="mt-6 flex justify-start">
            <div className="bg-white rounded-lg p-6 w-full shadow-md">
              <div className="space-y-3">
                <div className="flex justify-between text-sm text-gray-600">
                  <span>Subtotal:</span>
                  <span>
                    ৳{" "}
                    {cartItems
                      .reduce(
                        (sum, item) => sum + item.productPrice * item.quantity,
                        0
                      )
                      .toLocaleString("en-BD")}
                  </span>
                </div>
                <div className="border-t border-gray-300 pt-3">
                  <div className="flex justify-between text-lg font-bold text-gray-800">
                    <span>Total:</span>
                    <span>
                      ৳{" "}
                      {cartItems
                        .reduce(
                          (sum, item) =>
                            sum + item.productPrice * item.quantity,
                          0
                        )
                        .toLocaleString("en-BD")}
                    </span>
                  </div>
                </div>
              </div>

              <div className="flex gap-3 justify-end mt-4">
                <Link href="/">
                  <button className="px-3 py-2 border-2 border-[#0970B4] hover:bg-[#0970B4] hover:cursor-pointer hover:text-white font-bold ">
                    Continue Shopping
                  </button>
                </Link>
                <Link href="/checkout">
                  <button
                    onClick={handleGoCheckout}
                    className="px-3 py-2 border border-[#0970B4] bg-[#0970B4] text-white hover:cursor-pointer hover:bg-[#08629e] font-bold"
                  >
                    Go Checkout
                  </button>
                </Link>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
