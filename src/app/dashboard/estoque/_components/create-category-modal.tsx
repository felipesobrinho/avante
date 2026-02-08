"use client";

import { useState, ReactNode } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useCategoriesStore } from "@/stores/useCategoriesStore";

const categorySchema = z.object({
  name: z.string().min(1, "Nome da categoria é obrigatório"),
});

type CategoryFormData = z.infer<typeof categorySchema>;

type CreateCategoryModalProps = {
  children: ReactNode;
};

export function CreateCategoryModal({ children }: CreateCategoryModalProps) {
  const { addCategory } = useCategoriesStore();
  const [open, setOpen] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<CategoryFormData>({
    resolver: zodResolver(categorySchema),
  });

  const onSubmit = async (data: CategoryFormData) => {
    await addCategory(data);
    reset();
    setOpen(false);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        {children}
      </DialogTrigger>

      <DialogContent>
        <DialogHeader>
          <DialogTitle>Criar Categoria</DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div className="space-y-2">
            <Label>Nome</Label>
            <Input {...register("name")} />
            {errors.name && (
              <p className="text-sm text-red-500">
                {errors.name.message}
              </p>
            )}
          </div>

          <Button type="submit">Cadastrar</Button>
        </form>
      </DialogContent>
    </Dialog>
  );
}
