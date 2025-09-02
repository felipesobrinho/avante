import { Customer } from "@/utils/types/customer"
import { create } from "zustand"

type CustomerState = {
  customers: Customer[]
  isLoading: boolean,
  error: string | null,
  fetchCustomers: () => Promise<void>
  addCustomer: (customer: Omit<Customer, "id" | "createdAt" | "updatedAt">) => Promise<void>
  deleteCustomer: (id: string) => Promise<void>;
  editCustomer: (customer: Omit<Customer, "createdAt" | "updatedAt">) => Promise<void>;
}

export const useCustomersStore = create<CustomerState>((set) => ({
  customers: [],
  isLoading: false,
  error: null,

  fetchCustomers: async () => {
    set({ isLoading: true });
    try {
      const res = await fetch("/api/clientes");
      const data: Customer[] = await res.json();
      set({ customers: data });
    } catch (err: unknown) {
      if (err instanceof Error) {
        set({ error: err.message })
      } else {
        set({ error: "Erro desconhecido" })
      }
    } finally {
      set({ isLoading: false });
    }
  },

  addCustomer: async (customer) => {
    const res = await fetch("/api/clientes", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(customer),
    })
    const newCustomer = await res.json()
    set((state) => ({ customers: [...state.customers, newCustomer] }))
  },

  deleteCustomer: async (id: string) => {
    try {
      const res = await fetch(`/api/clientes`, {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id }),
      });

      if (!res.ok) throw new Error("Falha ao excluir cliente");

      set((state) => ({
        customers: state.customers.filter((customer) => customer.id !== id),
      }));
    } catch (err: unknown) {
      if (err instanceof Error) {
        set({ error: err.message })
      } else {
        set({ error: "Erro desconhecido" })
      }
    }
  },

  editCustomer: async (data: Omit<Customer, "createdAt" | "updatedAt">) => {
    try {
      const res = await fetch(`/api/clientes`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      if (!res.ok) throw new Error("Falha ao editar cliente");

      const updatedData = await res.json();
      set((state) => ({
        customers: state.customers.map((customer) =>
          customer.id === data.id ? { ...customer, ...updatedData } : customer
        ),
      }));
    } catch (err: unknown) {
      if (err instanceof Error) {
        set({ error: err.message })
      } else {
        set({ error: "Erro desconhecido" })
      }
    }
  },
}))
