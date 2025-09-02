"use client"

import { SiteHeader } from "@/components/site-header"
import { useEffect } from "react"
import { useCategoriesStore } from "@/stores/useCategoriesStore"
import { CategoryTable } from "../_components/category-table"

export default function Page() {
    const { fetchCategories } = useCategoriesStore()

    useEffect(() => {
        fetchCategories()
    }, [fetchCategories])

    return (
        <div>
            <SiteHeader pageName="Categorias" />
            <div className="flex flex-1 flex-col">
                <div className="@container/main flex flex-1 flex-col gap-2">
                    <div className="flex flex-col gap-4 py-4 md:gap-6 md:py-6">
                        <CategoryTable />
                    </div>
                </div>
            </div>
        </div>
    )
}
