export interface Product {
  id: string
  name: string
  description?: string
  measure?: string
  price: number
  stock?: number | null
  categoryId?: string | null
  category: {
    name: string
  }
  createdAt: Date
  updatedAt: Date
}

export type NewProduct = Omit<Product, "id" | "createdAt" | "updatedAt" | "category">

export type UpdateProductInput = Omit<Product, "createdAt" | "updatedAt" | "category">