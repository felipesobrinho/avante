"use client";

import { useCategoriesStore } from "@/stores/useCategoriesStore";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { MoreHorizontal, Trash2, Package, Plus } from "lucide-react";
import {
 DropdownMenu,
 DropdownMenuContent,
 DropdownMenuItem,
 DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { EditCategoryModal } from "./edit-category-modal";
import { CreateCategoryModal } from "./create-category-modal";

export function CategoryGrid() {
 const { categories, deleteCategory } = useCategoriesStore();

 if (!categories.length) {
  return (
   <p className="text-muted-foreground text-sm">
    Nenhuma categoria cadastrada.
   </p>
  );
 }

 return (
  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mx-auto">
   {categories.map((category) => (
    <Card key={category.id} className="group hover:shadow-md transition-shadow">
     <CardHeader className="flex flex-row items-start justify-between space-y-0 pb-2">
      <div className="w-12 h-12 rounded-xl bg-primary flex items-center justify-center">
       <Package className="w-6 h-6 text-primary-foreground" />
      </div>

      <DropdownMenu>
       <DropdownMenuTrigger asChild>
        <Button
         variant="ghost"
         size="icon"
         className="opacity-0 group-hover:opacity-100 transition-opacity"
        >
         <MoreHorizontal className="w-4 h-4" />
        </Button>
       </DropdownMenuTrigger>

       <DropdownMenuContent align="end">
        <div className="hover:bg-accent focus:bg-accent focus:text-accent-foreground data-[variant=destructive]:text-destructive data-[variant=destructive]:focus:bg-destructive/10 dark:data-[variant=destructive]:focus:bg-destructive/20 data-[variant=destructive]:focus:text-destructive data-[variant=destructive]:*:[svg]:!text-destructive [&_svg:not([class*='text-'])]:text-muted-foreground relative flex cursor-default items-center gap-2 rounded-sm px-2 py-1.5 text-sm outline-hidden select-none data-[disabled]:pointer-events-none data-[disabled]:opacity-50 data-[inset]:pl-8 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4">
         <EditCategoryModal categoryId={category.id} />
        </div>
        <DropdownMenuItem
         onClick={() => deleteCategory(category.id)}
         className="text-red-500"
        >
         <Button variant="outline" className="w-full flex justify-center">
          <Trash2 className="mr-2 h-4 w-4" /> Excluir
         </Button>
        </DropdownMenuItem>
       </DropdownMenuContent>
      </DropdownMenu>
     </CardHeader>

     <CardContent>
      <CardTitle className="text-lg mb-1">{category.name}</CardTitle>

      {category.description && (
       <p className="text-sm text-muted-foreground mb-4">
        {category.description}
       </p>
      )}

      <div className="flex items-center gap-2">
       <span className="text-2xl font-semibold">
        {category._count?.products ?? 0}
       </span>
       <span className="text-sm text-muted-foreground">produtos</span>
      </div>
     </CardContent>
    </Card>
   ))}
   <CreateCategoryModal>
    <Card className="border-dashed border-2 hover:border-primary/50 hover:bg-primary/5 transition-all cursor-pointer group">
     <CardContent className="h-full flex flex-col items-center justify-center py-12">
      <div className="w-12 h-12 rounded-xl bg-muted flex items-center justify-center mb-3 group-hover:bg-primary/10 transition-colors">
       <Plus className="w-6 h-6 text-muted-foreground group-hover:text-primary transition-colors" />
      </div>

      <p className="font-medium text-muted-foreground group-hover:text-primary transition-colors">
       Adicionar Categoria
      </p>
     </CardContent>
    </Card>
   </CreateCategoryModal>
  </div>
 );
}
