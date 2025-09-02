import { Product } from "@/utils/types/product"
import { create } from "zustand"

interface ProductsState {
  products: Product[]
  isLoading: boolean
  error: string | null
  fetchProducts: () => Promise<void>
  addProduct: (product: Omit<Product, "id" | "createdAt" | "updatedAt">) => Promise<void>
  deleteProduct: (id: string) => Promise<void>
  editProduct: (product: Omit<Product, "createdAt" | "updatedAt">) => Promise<void>
}

export const useProductsStore = create<ProductsState>((set, get) => ({
  products: [],
  isLoading: false,
  error: null,

  fetchProducts: async () => {
    set({ isLoading: true, error: null })
    try {
      const res = await fetch("/api/produtos")
      if (!res.ok) throw new Error("Erro ao buscar produtos")
      const data = await res.json()
      set({ products: data, isLoading: false })
    } catch (err: unknown) {
      if (err instanceof Error) {
        set({ error: err.message })
      } else {
        set({ error: "Erro desconhecido" })
      }
    }
  },

  addProduct: async (newProduct) => {
    try {
      const res = await fetch("/api/produtos", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newProduct),
      })
      if (!res.ok) throw new Error("Erro ao adicionar produto")
      const data = await res.json()
      set({ products: [...get().products, data] })
    } catch (err: unknown) {
      if (err instanceof Error) {
        set({ error: err.message })
      } else {
        set({ error: "Erro desconhecido" })
      }
    }
  },

  deleteProduct: async (id) => {
    try {
      const res = await fetch(`/api/produtos`, {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id }),
      })
      if (!res.ok) throw new Error("Erro ao excluir produto")

      set({ products: get().products.filter((p) => p.id !== id) })
    } catch (err: unknown) {
      if (err instanceof Error) {
        set({ error: err.message })
      } else {
        set({ error: "Erro desconhecido" })
      }
    }
  },

  editProduct: async (data) => {
    try {
      const res = await fetch(`/api/produtos`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      })
      if (!res.ok) throw new Error("Erro ao editar produto")

      const updatedData = await res.json()
      set({
        products: get().products.map((p) =>
          p.id === data.id ? { ...p, ...updatedData } : p
        ),
      })
    } catch (err: unknown) {
      if (err instanceof Error) {
        set({ error: err.message })
      } else {
        set({ error: "Erro desconhecido" })
      }
    }
  },
}))
