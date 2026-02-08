"use client";

import { SiteHeader } from "@/components/site-header";
import { useEffect } from "react";
import { useCategoriesStore } from "@/stores/useCategoriesStore";
import { CategoryGrid } from "../_components/category-grid";
import { CreateCategoryModal } from "../_components/create-category-modal";
import { Plus } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function Page() {
 const { fetchCategories } = useCategoriesStore();

 useEffect(() => {
  fetchCategories();
 }, [fetchCategories]);

 return (
  <div>
   <SiteHeader
    pageName="Categorias"
    action={
     <CreateCategoryModal>
      <Button variant="outline">
       <Plus className="mr-2 h-4 w-4" /> Nova Categoria
      </Button>
     </CreateCategoryModal>
    }
   />

   <div className="flex flex-1 flex-col">
    <div className="@container/main flex flex-1 flex-col gap-2">
     <div className="flex flex-col gap-4 py-4 md:gap-6 md:py-6">
      <CategoryGrid />
     </div>
    </div>
   </div>
  </div>
 );
}
