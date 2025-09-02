export interface Product {
  id: string
  name: string
  description?: string
  measure?: string
  price: number
  stock?: number | null
  categoryId?: string | null
  createdAt: Date
  updatedAt: Date
}