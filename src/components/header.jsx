"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useAuthStore, useCartStore } from "@/lib/store";
import { Button } from "./ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { ShoppingCart, Sun, Moon, Menu, X } from "lucide-react";
import { useTheme } from "next-themes";

export default function Header() {
  const router = useRouter();
  const { user, logout } = useAuthStore();
  const cartItems = useCartStore((state) => state.items || []);
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  const toggleTheme = () => {
    setTheme(theme === "dark" ? "light" : "dark");
  };

  const handleLogout = () => {
    logout();
    router.push("/login");
  };

  return (
    <header className="bg-background shadow-md z-50 transition-all duration-300 sticky top-0">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between">
        {/* Logo */}
        <Link
          href="/"
          className="text-xl sm:text-2xl font-bold   hover:text-blue-600 transition-colors duration-200"
        >
          E-commerce
        </Link>

        {/* Desktop navigatsiya */}
        <div className="hidden md:flex items-center space-x-6">
          <Button
            variant="ghost"
            size="icon"
            onClick={toggleTheme}
            aria-label="Temani o‘zgartirish"
            className="hover:bg-gray-100 dark:hover:bg-gray-800 rounded-full"
          >
            {theme === "dark" ? (
              <Sun className="h-5 w-5 text-yellow-500" />
            ) : (
              <Moon className="h-5 w-5 text-gray-600" />
            )}
          </Button>
          <Button
            variant="outline"
            onClick={() => router.push("/cart")}
            className="relative flex items-center space-x-2 border-gray-300 dark:border-gray-600 hover:border-blue-500 transition-colors duration-200"
          >
            <ShoppingCart className="h-4 w-4" />
            <span>Savat</span>
            {cartItems.length > 0 && (
              <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs font-semibold rounded-full h-5 w-5 flex items-center justify-center">
                {cartItems.length}
              </span>
            )}
          </Button>
          {user ? (
            <div className="flex items-center space-x-4">
              <Link href="/profile" className="flex items-center space-x-2">
                <Avatar className="h-9 w-9">
                  <AvatarImage
                    src={user.avatar}
                    alt={user.name || "Foydalanuvchi"}
                  />
                  <AvatarFallback className="bg-blue-500 text-white">
                    {user.name?.charAt(0).toUpperCase() || "U"}
                  </AvatarFallback>
                </Avatar>
                <span className="text-sm font-medium text-gray-900 dark:text-gray-100">
                  {user.name || "Foydalanuvchi"}
                </span>
              </Link>
              <Button
                variant="ghost"
                onClick={handleLogout}
                className="text-red-500 hover:text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20"
              >
                Chiqish
              </Button>
            </div>
          ) : (
            <Button
              onClick={() => router.push("/login")}
              className="bg-blue-600 text-white hover:bg-blue-700 transition-colors duration-200"
            >
              Kirish
            </Button>
          )}
        </div>

        {/* Mobil menu tugmasi */}
        <div className="md:hidden flex items-center">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label="Menyuni ochish/yopish"
          >
            {isMobileMenuOpen ? (
              <X className="h-6 w-6" />
            ) : (
              <Menu className="h-6 w-6" />
            )}
          </Button>
        </div>
      </div>

      {/* Mobil menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden bg-background border-t border-gray-200 dark:border-gray-700 px-4 py-6 space-y-4 animate-slide-down">
          <Button
            variant="ghost"
            size="icon"
            onClick={toggleTheme}
            aria-label="Temani o‘zgartirish"
            className="w-full flex justify-start hover:bg-gray-100 dark:hover:bg-gray-800"
          >
            {theme === "dark" ? (
              <Sun className="h-5 w-5 text-yellow-500 mr-2" />
            ) : (
              <Moon className="h-5 w-5 text-gray-600 mr-2" />
            )}
            <span>
              {theme === "dark" ? "Yorug‘lik rejimi" : "Qorong‘u rejim"}
            </span>
          </Button>
          <Button
            variant="outline"
            onClick={() => router.push("/cart")}
            className="w-full flex justify-start relative border-gray-300 dark:border-gray-600 hover:border-blue-500"
          >
            <ShoppingCart className="h-4 w-4 mr-2" />
            <span>Savat</span>
            {cartItems.length > 0 && (
              <span className="absolute top-1 right-2 bg-red-500 text-white text-xs font-semibold rounded-full h-5 w-5 flex items-center justify-center">
                {cartItems.length}
              </span>
            )}
          </Button>
          {user ? (
            <>
              <Link
                href="/profile"
                className="flex items-center space-x-2 py-2"
              >
                <Avatar className="h-8 w-8">
                  <AvatarImage
                    src={user.avatar}
                    alt={user.name || "Foydalanuvchi"}
                  />
                  <AvatarFallback className="bg-blue-500 text-white">
                    {user.name?.charAt(0).toUpperCase() || "U"}
                  </AvatarFallback>
                </Avatar>
                <span className="text-sm font-medium text-gray-900 dark:text-gray-100">
                  {user.name || "Foydalanuvchi"}
                </span>
              </Link>
              <Button
                variant="ghost"
                onClick={handleLogout}
                className="w-full text-left text-red-500 hover:text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20"
              >
                Chiqish
              </Button>
            </>
          ) : (
            <Button
              onClick={() => router.push("/login")}
              className="w-full bg-blue-600 text-white hover:bg-blue-700"
            >
              Kirish
            </Button>
          )}
        </div>
      )}
    </header>
  );
}
