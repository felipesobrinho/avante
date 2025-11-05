"use client"

import { useEffect, useState } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import * as z from "zod"
import { Pencil } from "lucide-react"
import { Label } from "@/components/ui/label"
import { useCategoriesStore } from "@/stores/useCategoriesStore"

const categorySchema = z.object({
    id: z.string(),
    name: z.string().min(1, "Nome da categoria é obrigatório"),
})

type CategoryFormData = z.infer<typeof categorySchema>

export function EditCategoryModal({ categoryId }: { categoryId: string }) {
    const [modalOpen, setModalOpen ] = useState(false)
    const { editCategory } = useCategoriesStore()
    const { register, handleSubmit, setValue, reset, formState: { errors, isSubmitting } } = useForm<CategoryFormData>({
        resolver: zodResolver(categorySchema)
    })

    useEffect(() => {
        if (categoryId) {
            fetch(`/api/categorias/${categoryId}`)
                .then(res => res.json())
                .then(category => {
                    if (category) {
                        setValue("id", category.id)
                        setValue("name", category.name)
                    }
                })
                .catch(err => console.error(err))
        }
    }, [categoryId, setValue])

    const onSubmit = async (data: CategoryFormData) => {
        await editCategory(data)
        reset()
        setModalOpen(false)
    }

    return (
        <Dialog open={modalOpen} onOpenChange={setModalOpen}>
            <DialogTrigger asChild>
                <Button variant="outline">
                    <Pencil className="text-gray-500" /> <p className="hover:text-white text-yellow-500">Editar Categoria</p>
                </Button>
            </DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Editar Categoria</DialogTitle>
                </DialogHeader>
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 flex flex-col">
                    <Label htmlFor="name">Nome da Categoria</Label>
                    <Input
                        placeholder="Nome"
                        {...register("name")}
                        id="name"
                        aria-invalid={!!errors.name}
                    />
                    {errors.name && (
                        <span className="text-red-500 text-sm">{errors.name.message}</span>
                    )}

                    <Button type="submit" disabled={isSubmitting}>Salvar</Button>
                </form>
            </DialogContent>
        </Dialog>
    )
}
