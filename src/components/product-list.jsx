"use client";

import { useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import ProductCard from "./product-card";
import { useProductStore } from "../lib/store";
import { getDataFn } from "@/api/api";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export default function ProductList() {
  // Mahsulotlar va kategoriyalarni olish
  const {
    data: productsData,
    isLoading: productsLoading,
    error: productsError,
  } = useQuery({
    queryKey: ["products"],
    queryFn: () => getDataFn("/product/get"),
    staleTime: 5 * 60 * 1000,
  });

  const {
    data: categoriesData,
    isLoading: categoriesLoading,
    error: categoriesError,
  } = useQuery({
    queryKey: ["categories"],
    queryFn: () => getDataFn("/category/get"),
    staleTime: 5 * 60 * 1000,
  });

  const setProducts = useProductStore((state) => state.setProducts);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");

  useEffect(() => {
    if (productsData?.message) {
      setProducts(productsData.message);
    }
  }, [productsData, setProducts]);

  const filteredProducts = productsData?.message?.filter((product) => {
    return (
      (selectedCategory === "all" ||
        product.category_id === Number(selectedCategory)) &&
      (searchTerm === "" ||
        product.name.toLowerCase().includes(searchTerm.toLowerCase()))
    );
  });

  if (productsLoading || categoriesLoading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-blue-500"></div>
      </div>
    );
  }

  if (productsError || categoriesError) {
    return (
      <div className="text-center text-red-500 p-4">
        Xatolik yuz berdi: {productsError?.message || categoriesError?.message}
      </div>
    );
  }

  return (
    <section className="py-8">
      <div className="mb-6 flex justify-between items-center">
        <input
          type="text"
          placeholder="Qidiruv..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="border border-gray-300 rounded-lg p-2 w-full sm:w-64 dark:bg-gray-800 dark:text-white dark:border-gray-600"
        />
        <Select value={selectedCategory} onValueChange={setSelectedCategory}>
          <SelectTrigger className="border border-gray-300 rounded-lg p-2 w-full sm:w-64 dark:bg-gray-800 dark:text-white dark:border-gray-600">
            <SelectValue placeholder="Barcha kategoriyalar" />
          </SelectTrigger>
          <SelectContent className="bg-white dark:bg-gray-800">
            <SelectItem value="all">Barcha kategoriyalar</SelectItem>
            {categoriesData?.message?.map((category) => (
              <SelectItem key={category.id} value={String(category.id)}>
                {category.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6 md:gap-8">
        {filteredProducts?.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </section>
  );
}
