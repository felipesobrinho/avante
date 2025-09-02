"use client"

import { useEffect, useState } from "react"
import { Controller, useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import * as z from "zod"
import { Pencil } from "lucide-react"
import { Label } from "@/components/ui/label"
import { useProductsStore } from "@/stores/useProductsStore"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useCategoriesStore } from "@/stores/useCategoriesStore"

const productSchema = z.object({
  id: z.string(),
  name: z.string().min(1),
  price: z.number().min(0),
  categoryId: z.string().min(1),
  measure: z.string().min(1),
})

type ProductFormData = z.infer<typeof productSchema>

export function EditProductModal({ productId }: { productId: string }) {
  const [modalOpen, setModalOpen ] = useState(false)
  const { editProduct } = useProductsStore()
  const { categories, fetchCategories } = useCategoriesStore()
  const { register, handleSubmit, setValue, reset, control, formState: { errors } } = useForm<ProductFormData>({
    resolver: zodResolver(productSchema)
  })

  useEffect(() => {
    if (productId) {
      fetch(`/api/produtos/${productId}`)
        .then(res => res.json())
        .then(product => {
          if (product) {
            setValue("id", product.id)
            setValue("name", product.name)
            setValue("price", product.price)
            setValue("categoryId", product.categoryId)
            setValue("measure", product.measure)
          }
        })
        .catch(err => console.error(err))
    }
    fetchCategories()
  }, [productId, setValue, fetchCategories])

  const onSubmit = async (data: ProductFormData) => {
    await editProduct(data)
    reset()
    setModalOpen(false)
  }

  return (
    <Dialog open={modalOpen} onOpenChange={setModalOpen}>
      <DialogTrigger asChild>
        <Button variant="outline">
          <Pencil className="text-gray-500" /> <p className="hover:text-white text-yellow-500">Editar Pedido</p>
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Editar Pedido</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <Label htmlFor="name">Produto</Label>
          <Input placeholder="Nome" {...register("name")} />
          
          <Label htmlFor="categoryId"> Categoria </Label>
          <Controller
            name="categoryId"
            control={control}
            render={({ field }) => (
              <Select value={field.value} onValueChange={field.onChange}>
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
            )}
          />
          {errors.categoryId && (
            <p className="text-red-500 text-sm font-bold">{errors.categoryId.message}</p>
          )}
          
          <Label htmlFor="price">Preço</Label>
          <Input placeholder="Preço" type="number" {...register("price", {valueAsNumber: true})} />
          <Label htmlFor="measure">Medida</Label>
          <Input placeholder="Medida" {...register("measure")} />
          <Button type="submit">Salvar</Button>
        </form>
      </DialogContent>
    </Dialog>
  )
}
