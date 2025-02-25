import { create } from "zustand"
import { persist } from "zustand/middleware"

export const useAuthStore = create(
  persist(
    (set) => ({
      user: null,
      login: (user) => set({ user }),
      logout: () => set({ user: null }),
    }),
    { name: "auth-storage" },
  ),
)

export const useCartStore = create(
  persist(
    (set, get) => ({
      items: [],
      addToCart: (product) =>
        set((state) => {
          const existingItem = state.items.find((item) => item.id === product.id)
          if (existingItem) {
            return {
              items: state.items.map((item) =>
                item.id === product.id ? { ...item, quantity: (item.quantity || 1) + 1 } : item,
              ),
            }
          }
          return { items: [...state.items, { ...product, quantity: 1 }] }
        }),
      removeFromCart: (productId) => set((state) => ({ items: state.items.filter((item) => item.id !== productId) })),
      updateQuantity: (productId, quantity) =>
        set((state) => ({
          items: state.items.map((item) => (item.id === productId ? { ...item, quantity } : item)),
        })),
      clearCart: () => set({ items: [] }),
      getTotal: () => {
        const items = get().items
        return items.reduce((total, item) => total + item.price * (item.quantity || 1), 0)
      },
    }),
    { name: "cart-storage" },
  ),
)

export const useProductStore = create((set) => ({
  products: [],
  setProducts: (products) => set({ products }),
}))

