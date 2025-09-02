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
import { useCustomersStore } from "@/stores/useCustomerStore"

const customerSchema = z.object({
  id: z.string(),
  name: z.string().min(1),
  phone: z.string().min(1),
  address: z.string().min(1),
})

type CustomerFormData = z.infer<typeof customerSchema>

export function EditCustomerModal({ customerId }: { customerId: string }) {
  const { editCustomer } = useCustomersStore()
  const [modalOpen, setModalOpen ] = useState(false)
  const { register, handleSubmit, setValue, reset } = useForm<CustomerFormData>({
    resolver: zodResolver(customerSchema)
  })

  useEffect(() => {
    if (customerId) {
      fetch(`/api/clientes/${customerId}`)
        .then(res => res.json())
        .then(order => {
          if (order) {
            setValue("id", order.id)
            setValue("name", order.name)
            setValue("phone", order.phone)
            setValue("address", order.address)
          }
        })
        .catch(err => console.error(err))
    }
  }, [customerId, setValue])

  const onSubmit = async (data: CustomerFormData) => {
    await editCustomer(data)
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
          <Label htmlFor="name">Cliente</Label>
          <Input placeholder="Nome" {...register("name")} />
          <Label htmlFor="phone">Telefone</Label>
          <Input placeholder="Telefone" {...register("phone")} />
          <Label htmlFor="address">Endereço</Label>
          <Input placeholder="Endereço" {...register("address")} />

          <Button type="submit">Salvar</Button>
        </form>
      </DialogContent>
    </Dialog>
  )
}
