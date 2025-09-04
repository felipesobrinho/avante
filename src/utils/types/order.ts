export interface Order {
  id: string
  customerId: string
  customer: {
    name: string
  }
  productId: string
  product: {
    name: string
    measure: string
    productionType: string
  }
  description?: string
  quantity: number
  totalPrice: number
  status: "pendente" | "pago" | "entregue"
  orderDay: Date
  createdAt: Date
  updatedAt: Date
}

export type NewOrder = Omit<
  Order,
  "id" | "createdAt" | "updatedAt" | "customer" | "product"
>

export type UpdateOrderInput = Omit<
  Order,
  "createdAt" | "updatedAt" | "customer" | "product"
>;