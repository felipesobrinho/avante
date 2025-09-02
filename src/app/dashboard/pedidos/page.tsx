"use client"

import { SiteHeader } from "@/components/site-header"
import { useEffect } from "react"
import { useOrdersStore } from "@/stores/useOrdersStore"
import { OrdersTable } from "./_components/order-table"

export default function Page() {
  const { fetchOrders } = useOrdersStore()

  useEffect(() => {
    fetchOrders()
  }, [fetchOrders])

  return (
    <div>
      <SiteHeader pageName="Pedidos" />
      <div className="flex flex-1 flex-col">
        <div className="@container/main flex flex-1 flex-col gap-2">
          <div className="flex flex-col gap-4 py-4 md:gap-6 md:py-6">
            <OrdersTable />
          </div>
        </div>
      </div>
    </div>
  )
}
