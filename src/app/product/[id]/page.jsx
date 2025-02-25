"use client";

import { useState, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { useCartStore } from "@/lib/store";
import { getDataFn } from "@/lib/api";
import Image from "next/image";
import { Button } from "@/components/ui/button";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useParams } from "next/navigation";
import ProductList from "@/components/product-list";

export default function ProductPage() {
  const params = useParams();
  const { id } = params || {};
  const [selectedColor, setSelectedColor] = useState("");
  const [selectedSize, setSelectedSize] = useState("");
  const [mounted, setMounted] = useState(false);
  const addToCart = useCartStore((state) => state.addToCart);

  // Mahsulot ma'lumotlarini olish
  const {
    data: product,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["product", id],
    queryFn: () => getDataFn(`/products/${id}`),
    enabled: !!id,
    staleTime: 5 * 60 * 1000,
  });

  useEffect(() => {
    setMounted(true);
    if (product?.colors?.length) setSelectedColor(product.colors[0]);
    if (product?.sizes?.length) setSelectedSize(product.sizes[0]);
  }, [product]);

  if (!mounted) return null;

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-blue-500"></div>
      </div>
    );
  }

  if (error || !product) {
    return (
      <div className="text-center text-red-500 p-8">
        {error ? `Xatolik: ${error.message}` : "Mahsulot topilmadi"}
      </div>
    );
  }

  const handleAddToCart = () => {
    if (!selectedColor || !selectedSize) {
      alert("Iltimos, rang va o‘lchamni tanlang!");
      return;
    }
    addToCart({
      ...product,
      color: selectedColor,
      size: selectedSize,
      quantity: 1,
    });
    alert("Mahsulot savatga qo‘shildi!");
  };

  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 mb-40">
        {/* Rasm qismi */}
        <div className="relative w-full max-w-md mx-auto lg:max-w-full aspect-square overflow-hidden rounded-xl shadow-lg">
          <Image
            src={product.images[0] || "/globe.svg"}
            alt={product.title || "Mahsulot rasmi"}
            fill
            objectFit="cover"
            className="transition-transform duration-300 hover:scale-105"
            priority // Muhim sahifada tez yuklanishi uchun
          />
          {product.discount && (
            <span className="absolute top-4 left-4 bg-red-500 text-white text-sm font-semibold px-3 py-1 rounded-full">
              -{product.discount}%
            </span>
          )}
        </div>

        {/* Ma'lumotlar qismi */}
        <div className="flex flex-col justify-center">
          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-4">
            {product.title}
          </h1>

          <p className="text-sm sm:text-base text-gray-600 dark:text-gray-400 mb-8 leading-relaxed">
            {product.description || "Mahsulot haqida ma'lumot mavjud emas."}
          </p>

          {/* Rang tanlash */}
          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 dark:text-white mb-2">
              Rang
            </label>
            <Select value={selectedColor} onValueChange={setSelectedColor}>
              <SelectTrigger className="w-full sm:w-64 ">
                <SelectValue placeholder="Rangni tanlang" />
              </SelectTrigger>
              <SelectContent className="bg-white dark:bg-gray-800">
                {(product.colors || ["red", "blue", "green"]).map((color) => (
                  <SelectItem key={color} value={color}>
                    {color.charAt(0).toUpperCase() + color.slice(1)}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* O‘lcham tanlash */}
          <div className="mb-8">
            <label className="block text-sm font-medium text-gray-700 dark:text-white mb-2">
              O‘lcham
            </label>
            <Select value={selectedSize} onValueChange={setSelectedSize}>
              <SelectTrigger className="w-full sm:w-64">
                <SelectValue placeholder="O‘lchamni tanlang" />
              </SelectTrigger>
              <SelectContent className="bg-white dark:bg-gray-800">
                {(product.sizes || ["s", "m", "l"]).map((size) => (
                  <SelectItem key={size} value={size}>
                    {size.toUpperCase()}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div className="flex items-center gap-4 mb-6">
            <p className="text-xl sm:text-2xl font-semibold text-gray-900 dark:text-white">
              $
              {(product.price * (1 - (product.discount || 0) / 100)).toFixed(2)}
            </p>
            {product.discount && (
              <p className="text-base text-gray-500 dark:text-gray-400 line-through">
                ${product.price.toFixed(2)}
              </p>
            )}
          </div>
          {/* Savatga qo‘shish tugmasi */}
          <Button
            onClick={handleAddToCart}
            disabled={!selectedColor || !selectedSize}
            className="w-full sm:w-auto py-3 px-6 bg-gradient-to-r from-blue-500 to-indigo-600 text-white rounded-lg hover:from-blue-600 hover:to-indigo-700 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Savatga Qo‘shish
          </Button>
        </div>
      </div>
      <ProductList />
    </div>
  );
}
