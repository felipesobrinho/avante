export interface Order {
  id: string
  customerId: string
  customer: {
    id?: string
    name: string
    address?: string
  }
  items: Array<{
    productId: string
    quantity: number
    unitPrice?: number
    product?: {
      id?: string
      name: string
      measure?: string
      productionType?: "SOB_ENCOMENDA" | "EM_ESTOQUE" | string
    }
  }>
  description?: string | null
  totalPrice?: number | null
  status: "pendente" | "pago" | "entregue" | string
  orderDay: Date | string | null
  createdAt?: Date | string
  updatedAt?: Date | string
}

export type OrderItemInput = {
  productId: string
  quantity: number
  unitPrice?: number
}

export type NewOrder = {
  description?: string
  status: string
  orderDay: Date | string
  customerId: string
  items: OrderItemInput[]
}

export type UpdateOrderInput = NewOrder & { id: string }
