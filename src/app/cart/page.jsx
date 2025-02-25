"use client";

import { useState } from "react";
import { useCartStore } from "@/lib/store";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Image from "next/image";

export default function CartPage() {
  // Savat funksiyalari
  const { items, removeFromCart, updateQuantity, clearCart, getTotal } =
    useCartStore();
  const [isCheckingOut, setIsCheckingOut] = useState(false);

  // To'lov jarayonini boshlash
  const handleCheckout = () => {
    setIsCheckingOut(true);
    // To'lov jarayonini simulyatsiya qilish
    setTimeout(() => {
      clearCart();
      setIsCheckingOut(false);
      alert("To'lov muvaffaqiyatli yakunlandi!");
    }, 2000);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl sm:text-3xl font-bold mb-8">
        Sizning savatchangiz
      </h1>
      {items.length === 0 ? (
        <p>Sizning savatchangiz bo'sh.</p>
      ) : (
        <>
          {items.map((item) => (
            <div
              key={`${item.id}-${item.color}-${item.size}`}
              className="flex flex-col sm:flex-row items-center border-b py-4"
            >
              <div className="relative w-24 h-24 sm:w-20 sm:h-20 mb-2 sm:mb-0 sm:mr-4">
                <Image
                  src={item.images[0] || "/file.svg"}
                  alt={item.name || "img"}
                  fill
                  style={{ objectFit: "cover" }}
                  className="rounded"
                />
              </div>
              <div className="flex-grow text-center sm:text-left mb-2 sm:mb-0">
                <h3 className="font-semibold">{item.name}</h3>
                <p className="text-gray-600">${item.price.toFixed(2)}</p>
                <p className="text-sm text-gray-500">
                  Rang: {item.color}, O'lcham: {item.size}
                </p>
              </div>
              <div className="flex items-center">
                <Input
                  type="number"
                  min="1"
                  value={item.quantity || 1}
                  onChange={(e) =>
                    updateQuantity(item.id, Number.parseInt(e.target.value))
                  }
                  className="w-16 mr-2 sm:mr-4"
                />
                <Button
                  variant="destructive"
                  onClick={() => removeFromCart(item.id)}
                >
                  O'chirish
                </Button>
              </div>
            </div>
          ))}
          <div className="mt-8">
            <p className="text-xl font-bold">Jami: ${getTotal().toFixed(2)}</p>
            <Button
              onClick={handleCheckout}
              disabled={isCheckingOut}
              className="mt-4 w-full sm:w-auto"
            >
              {isCheckingOut ? "Jarayon..." : "To'lov qilish"}
            </Button>
          </div>
        </>
      )}
    </div>
  );
}
