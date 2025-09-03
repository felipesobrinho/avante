"use client";
import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useProductsStore } from "@/stores/useProductsStore";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useCategoriesStore } from "@/stores/useCategoriesStore";

const productSchema = z.object({
  name: z.string().min(1),
  price: z.number().optional(),
  categoryId: z.string().min(1),
  measure: z.string().min(1),
  stock: z.number().nullable(),
  productionType: z.enum(["SOB_ENCOMENDA", "EM_ESTOQUE"]),
}).refine((data) => {
  if (data.productionType === "EM_ESTOQUE" && (data.price === undefined || data.price <= 0)) {
    return false;
  }
  return true;
}, {
  message: "Preço é obrigatório quando o produto é 'Em estoque'",
  path: ["price"],
});

type ProductFormData = z.infer<typeof productSchema>;

export function CreateProductModal() {
  const { addProduct } = useProductsStore();
  const { categories, fetchCategories } = useCategoriesStore();
  const [modalOpen, setModalOpen] = useState(false);

  const { register, handleSubmit, reset, setValue, watch, formState: { errors } } = useForm<ProductFormData>({
    resolver: zodResolver(productSchema),
    defaultValues: {
      stock: null,
      productionType: "SOB_ENCOMENDA"
    }
  });

  const productionType = watch("productionType");

  const onSubmit = async (data: ProductFormData) => {
    await addProduct({
      ...data,
      stock: data.productionType === "EM_ESTOQUE" ? data.stock ?? 0 : null,
    });
    reset();
    setModalOpen(false);
  };

  useEffect(() => {
    fetchCategories();
  }, [fetchCategories]);

  return (
    <Dialog open={modalOpen} onOpenChange={setModalOpen}>
      <DialogTrigger asChild>
        <Button className="bg-blue-500 text-white">Novo Produto</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Criar Produto</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <Label>Nome</Label>
          <Input {...register("name")} />
          {errors.name && <p className="text-red-500">{errors.name.message}</p>}

          <Label>Categoria</Label>
          <Select
            onValueChange={(value) => setValue("categoryId", value, { shouldValidate: true })}
          >
            <SelectTrigger>
              <SelectValue placeholder="Selecione uma categoria" />
            </SelectTrigger>
            <SelectContent>
              {categories.map((p) => (
                <SelectItem key={p.id} value={p.id}>
                  {p.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          {errors.categoryId && (
            <p className="text-red-500 text-sm font-bold">{errors.categoryId.message}</p>
          )}

          <Label>Tipo de Produção</Label>
          <Select
            onValueChange={(value) =>
              setValue("productionType", value as "EM_ESTOQUE" | "SOB_ENCOMENDA", {
                shouldValidate: true,
              })
            }
            defaultValue="SOB_ENCOMENDA"
          >
            <SelectTrigger>
              <SelectValue placeholder="Selecione o tipo de produção" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="EM_ESTOQUE">Em estoque</SelectItem>
              <SelectItem value="SOB_ENCOMENDA">Sob encomenda</SelectItem>
            </SelectContent>
          </Select>
          {errors.productionType && (
            <p className="text-red-500">{errors.productionType.message}</p>
          )}

          {productionType === "EM_ESTOQUE" && (
            <>
              <Label>Preço</Label>
              <Input type="number" step="0.01" {...register("price", { valueAsNumber: true })} />
              {errors.price && <p className="text-red-500">{errors.price.message}</p>}
              
              <Label>Quantidade em Estoque</Label>
              <Input type="number" {...register("stock", { valueAsNumber: true })} />
              {errors.stock && (
                <p className="text-red-500">{errors.stock.message}</p>
              )}

            </>
          )}

          <Label>Medida</Label>
          <Input {...register("measure")} />
          {errors.measure && <p className="text-red-500">{errors.measure.message}</p>}

          <Button type="submit">Cadastrar Produto</Button>
        </form>
      </DialogContent>
    </Dialog>
  );
}
