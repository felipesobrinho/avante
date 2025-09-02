import { Category } from "@/utils/types/category"
import { create } from "zustand"

type CategoryState = {
    categories: Category[]
    isLoading: boolean
    error: string | null
    fetchCategories: () => Promise<void>
    addCategory: (category: Omit<Category, "id" | "createdAt" | "updatedAt">) => Promise<void>
    deleteCategory: (id: string) => Promise<void>
    editCategory: (category: Omit<Category, "createdAt" | "updatedAt">) => Promise<void>
}

export const useCategoriesStore = create<CategoryState>((set) => ({
    categories: [],
    isLoading: false,
    error: null,

    fetchCategories: async () => {
        set({ isLoading: true })
        try {
            const res = await fetch("/api/categorias")
            const data: Category[] = await res.json()
            set({ categories: data })
        } catch (err: unknown) {
            if (err instanceof Error) {
                set({ error: err.message })
            } else {
                set({ error: "Erro desconhecido" })
            }
        } finally {
            set({ isLoading: false })
        }
    },

    addCategory: async (category) => {
        const res = await fetch("/api/categorias", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(category),
        })
        const newCategory = await res.json()
        set((state) => ({ categories: [...state.categories, newCategory] }))
    },

    deleteCategory: async (id: string) => {
        try {
            const res = await fetch(`/api/categorias`, {
                method: "DELETE",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ id }),
            })

            if (!res.ok) throw new Error("Falha ao excluir categoria")

            set((state) => ({
                categories: state.categories.filter((category) => category.id !== id),
            }))
        } catch (err: unknown) {
            if (err instanceof Error) {
                set({ error: err.message })
            } else {
                set({ error: "Erro desconhecido" })
            }
        }
    },

    editCategory: async (data: Omit<Category, "createdAt" | "updatedAt">) => {
        try {
            const res = await fetch(`/api/categorias`, {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(data),
            })

            if (!res.ok) throw new Error("Falha ao editar categoria")

            const updatedData = await res.json()
            set((state) => ({
                categories: state.categories.map((category) =>
                    category.id === data.id ? { ...category, ...updatedData } : category
                ),
            }))
        } catch (err: unknown) {
            if (err instanceof Error) {
                set({ error: err.message })
            } else {
                set({ error: "Erro desconhecido" })
            }
        }
    },
}))
