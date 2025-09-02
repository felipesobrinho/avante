import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import * as z from "zod"
import { Label } from "@/components/ui/label"
import { useCustomersStore } from "@/stores/useCustomerStore"
import { useState } from "react"
  
const customerSchema = z.object({
  name: z.string().min(1),
  address: z.string().min(1),
  phone: z.string().min(1),
})

type CustomerFormData = z.infer<typeof customerSchema>

export function CreateCustomerModal() {
  const { addCustomer } = useCustomersStore()
  const [modalOpen, setModalOpen ] = useState(false)

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<CustomerFormData>({
    resolver: zodResolver(customerSchema),
  })

  const onSubmit = async (data: CustomerFormData) => {
    await addCustomer(data)
    reset()
    setModalOpen(false)
  }

  return (
    <Dialog open={modalOpen} onOpenChange={setModalOpen}>
      <DialogTrigger asChild>
        <Button className="max-w-[300px] bg-blue-500 text-white">
          Novo Cliente
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Cadastrar Cliente</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <Label htmlFor="name">Cliente</Label>
          <Input placeholder="Cliente" {...register("name")} />
          <Label htmlFor="address">Endereço</Label>
          <Input placeholder="Endereço" {...register("address")} />
          <Label htmlFor="phone">Telefone</Label>
          <Input placeholder="Telefone" {...register("phone")} />
          {errors.name && (
            <p className="text-red-500 text-sm font-bold">{errors.name.message}</p>
          )}

          <Button type="submit">Cadastrar Cliente</Button>
        </form>
      </DialogContent>
    </Dialog>
  )
}
