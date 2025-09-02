"use client"

import { SiteHeader } from "@/components/site-header"
import { useCustomersStore } from "@/stores/useCustomerStore"
import { useEffect } from "react"
import { CustomerTable } from "./_components/customer-table"

export default function Page() {
  const { fetchCustomers } = useCustomersStore()

  useEffect(() => {
    fetchCustomers()
  }, [fetchCustomers])

  return (
    <div>
      <SiteHeader pageName="Clientes" />
      <div className="flex flex-1 flex-col">
        <div className="@container/main flex flex-1 flex-col gap-2">
          <div className="flex flex-col gap-4 py-4 md:gap-6 md:py-6">
            <CustomerTable />
          </div>
        </div>
      </div>
    </div>
  )
}
