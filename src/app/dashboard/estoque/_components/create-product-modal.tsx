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

const productSchema = z.object({
  name: z.string().min(1),
  price: z.number().min(0),
  measure: z.string().min(1),
});

type ProductFormData = z.infer<typeof productSchema>;

export function CreateProductModal() {
  const { addProduct } = useProductsStore();
  const [modalOpen, setModalOpen] = useState(false);

  const { register, handleSubmit, reset, formState: { errors } } = useForm<ProductFormData>({
    resolver: zodResolver(productSchema)
  });

  const onSubmit = async (data: ProductFormData) => {
    await addProduct(data);
    reset();
    setModalOpen(false);
  };

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

          <Label>Preço</Label>
          <Input type="number" step="0.01" {...register("price", { valueAsNumber: true })} />
          {errors.price && <p className="text-red-500">{errors.price.message}</p>}

          <Label>Medida</Label>
          <Input {...register("measure")} />
          {errors.measure && <p className="text-red-500">{errors.measure.message}</p>}

          <Button type="submit">Cadastrar Produto</Button>
        </form>
      </DialogContent>
    </Dialog>
  );
}
