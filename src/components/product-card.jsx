"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { Button } from "./ui/button";
import { useCartStore } from "../lib/store";

export default function ProductCard({ product }) {
  const addToCart = useCartStore((state) => state.addToCart);
  const [mounted, setMounted] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <Link href={`/product/${product.id}`} className="block group">
      <div
        className="rounded-xl p-4 sm:p-6 bg-card shadow-md hover:shadow-2xl transition-all duration-300 ease-in-out transform hover:-translate-y-2 dark:bg-gray-800 dark:hover:bg-gray-700/70"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <div className="relative w-full aspect-square mb-4 sm:mb-6 overflow-hidden rounded-lg dark:after:absolute dark:after:inset-0 dark:after:bg-gray-800/20">
          <Image
            src={product.image_url[0] || "/globe.svg"}
            alt={product.name || "Mahsulot rasmi"}
            fill
            objectFit="cover"
            className={`transition-transform duration-500 ease-out ${
              isHovered ? "scale-110" : "scale-100"
            }`}
          />
          {product.discount && (
            <span className="absolute top-2 left-2 bg-destructive text-destructive-foreground text-xs font-semibold px-2 py-1 rounded-full dark:bg-red-800 dark:text-red-100">
              -{product.discount}%
            </span>
          )}
        </div>
        <h2 className="text-base sm:text-lg font-semibold text-card-foreground line-clamp-1 group-hover:text-primary transition-colors duration-200 dark:text-gray-200">
          {product.title}
        </h2>
        <p className="text-sm text-muted-foreground mb-3 line-clamp-2 dark:text-gray-400">
          {product.description}
        </p>
        <div className="flex items-center justify-between mb-4">
          <p className="text-lg sm:text-xl font-bold text-card-foreground dark:text-gray-100">
            {(product.price * (1 - (product.discount || 0) / 100)).toFixed(2)}
            <span className="text-green-700 dark:text-green-400">$</span>{" "}
          </p>
          {product.discount && (
            <p className="text-sm text-muted-foreground line-through dark:text-gray-500">
              ${product.price.toFixed(2)}
            </p>
          )}
        </div>
        <Button
          onClick={(e) => {
            e.preventDefault();
            addToCart(product);
            alert("Mahsulot savatga qo‘shildi!");
          }}
          className="w-full py-2 text-sm text-primary border border-primary bg-transparent hover:bg-gradient-to-r hover:from-primary hover:to-blue-600 hover:text-primary-foreground rounded-lg transition-all duration-200 dark:border-gray-400 dark:text-gray-300 dark:hover:bg-gradient-to-r dark:hover:from-gray-700 dark:hover:to-gray-600 dark:hover:text-white"
        >
          Savatga Qo‘shish
        </Button>
      </div>
    </Link>
  );
}
