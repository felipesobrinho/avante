"use client"

import { SiteHeader } from "@/components/site-header"
import { useEffect } from "react"
import { useProductsStore } from "@/stores/useProductsStore"
import { ProductTable } from "./_components/product-table"

export default function Page() {
  const { fetchProducts } = useProductsStore()

  useEffect(() => {
    fetchProducts()
  }, [fetchProducts])

  return (
    <div>
      <SiteHeader pageName="Estoque" />
      <div className="flex flex-1 flex-col">
        <div className="@container/main flex flex-1 flex-col gap-2">
          <div className="flex flex-col gap-4 py-4 md:gap-6 md:py-6">
            <ProductTable />
          </div>
        </div>
      </div>
    </div>
  )
}
