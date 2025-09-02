import { NewOrder, Order, UpdateOrderInput } from "@/utils/types/order"
import { create } from "zustand"

type OrdersState = {
  orders: Order[]
  fetchOrders: () => Promise<void>
  isLoading: boolean,
  addOrder: (order: NewOrder) => Promise<void>
  deleteOrder: (id: string) => Promise<void>;
  editOrder: (order: UpdateOrderInput) => Promise<void>;
}

export const useOrdersStore = create<OrdersState>((set) => ({
  orders: [],
  isLoading: false,

    fetchOrders: async () => {
    set({ isLoading: true });
    try {
      const res = await fetch("/api/pedidos");
      const data: Order[] = await res.json();
      set({ orders: data });
    } catch (error) {
      console.error("Erro ao buscar pedidos:", error);
    } finally {
      set({ isLoading: false });
    }
  },

  addOrder: async (order) => {
    const res = await fetch("/api/pedidos", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(order),
    })
    const newOrder = await res.json()
    set((state) => ({ orders: [...state.orders, newOrder] }))
  },

  deleteOrder: async (id: string) => {
    try {
      const res = await fetch(`/api/pedidos`, {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id }),
      });

      if (!res.ok) throw new Error("Falha ao excluir pedido");

      set((state) => ({
        orders: state.orders.filter((order) => order.id !== id),
      }));
    } catch (error) {
      console.error("Erro ao deletar pedido:", error);
    }
  },

  editOrder: async (data: UpdateOrderInput) => {
    try {
      const res = await fetch(`/api/pedidos`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      if (!res.ok) throw new Error("Falha ao editar pedido");

      const updatedData = await res.json();
      set((state) => ({
        orders: state.orders.map((order) =>
          order.id === data.id ? { ...order, ...updatedData } : order
        ),
      }));
    } catch (error) {
      console.error("Erro ao editar pedido:", error);
    }
  },
}))
