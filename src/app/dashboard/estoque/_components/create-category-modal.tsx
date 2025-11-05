"use client";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useCategoriesStore } from "@/stores/useCategoriesStore";

const categorySchema = z.object({
    name: z.string().min(1, "Nome da categoria é obrigatório"),
});

type CategoryFormData = z.infer<typeof categorySchema>;

export function CreateCategoryModal() {
    const { addCategory } = useCategoriesStore();
    const [modalOpen, setModalOpen] = useState(false);
    const [submitError, setSubmitError] = useState<string | null>(null);

    const { register, handleSubmit, reset, formState: { errors } } = useForm<CategoryFormData>({
        resolver: zodResolver(categorySchema)
    });

    const onSubmit = async (data: CategoryFormData) => {
        setSubmitError(null);
        if (!data.name || data.name.trim() === "") {
            setSubmitError("Nome da categoria é obrigatório");
            return;
        }
        try {
            await addCategory(data);
            reset();
            setModalOpen(false);
        } catch (err) {
            setSubmitError("Erro ao cadastrar categoria.");
        }
    };

    return (
        <Dialog open={modalOpen} onOpenChange={setModalOpen}>
            <DialogTrigger asChild>
                <Button className="bg-blue-500 text-white">Nova Categoria</Button>
            </DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Criar Categoria</DialogTitle>
                </DialogHeader>
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                    <Label>Nome</Label>
                    <Input {...register("name")} />
                    {errors.name && <p className="text-red-500">{errors.name.message}</p>}
                    {submitError && <p className="text-red-500">{submitError}</p>}

                    <Button type="submit">Cadastrar Categoria</Button>
                </form>
            </DialogContent>
        </Dialog>
    );
}
