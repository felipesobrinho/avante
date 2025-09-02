"use client"

import { useEffect, useState } from "react"
import { Controller, useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import * as z from "zod"
import { CalendarIcon, Pencil } from "lucide-react"
import { useOrdersStore } from "@/stores/useOrdersStore"
import { Calendar } from "@/components/ui/calendar"
import { ptBR } from "date-fns/locale"
import { format } from "date-fns"
import { Label } from "@/components/ui/label"
import { useCustomersStore } from "@/stores/useCustomerStore"
import { useProductsStore } from "@/stores/useProductsStore"
import { CreateCustomerModal } from "../../clientes/_components/create-customer-modal"

const orderSchema = z.object({
  id: z.string(),
  description: z.string().min(1),
  quantity: z.number().min(1),
  totalPrice: z.number().min(0),
  status: z.enum(["pendente", "pago", "entregue"]),
  orderDay: z.date({ error: "Selecione o dia do pedido!" }),
  customerId: z.string().min(1, "Selecione um cliente"),
  productId: z.string().min(1, "Selecione um produto"),
})

type OrderFormData = z.infer<typeof orderSchema>

export function EditOrderModal({ orderId }: { orderId: string }) {
  const [calendarOpen, setCalendarOpen] = useState(false)
  const { customers, fetchCustomers } = useCustomersStore()
  const { products, fetchProducts } = useProductsStore()
  const [modalOpen, setModalOpen] = useState(false)
  const { editOrder } = useOrdersStore()
  const { register, handleSubmit, setValue, control, reset } = useForm<OrderFormData>({
    resolver: zodResolver(orderSchema)
  })

  useEffect(() => {
    if (orderId) {
      fetch(`/api/pedidos/${orderId}`)
        .then(res => res.json())
        .then(order => {
          if (order) {
            setValue("id", order.id)
            setValue("description", order.description)
            setValue("quantity", order.quantity)
            setValue("totalPrice", order.totalPrice)
            setValue("orderDay", new Date(order.orderDay))
            setValue("status", order.status)
            setValue("customerId", order.customerId)
            setValue("productId", order.productId) // 👈 agora produto
          }
        })
        .catch(err => console.error(err))
    }
    fetchCustomers()
    fetchProducts()
  }, [orderId, setValue, fetchCustomers, fetchProducts])

  const onSubmit = async (data: OrderFormData) => {
    await editOrder(data)
    reset()
    setModalOpen(false)
  }

  return (
    <Dialog open={modalOpen} onOpenChange={setModalOpen}>
      <DialogTrigger asChild>
        <Button variant="outline">
          <Pencil className="text-gray-500" /> 
          <p className="hover:text-white text-yellow-500">Editar Pedido</p>
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Editar Pedido</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <Label>Cliente</Label>
          <Controller
            name="customerId"
            control={control}
            render={({ field }) => (
              <Select value={field.value} onValueChange={field.onChange}>
                <SelectTrigger>
                  <SelectValue placeholder="Cliente" />
                </SelectTrigger>
                <SelectContent>
                  {customers.map((c) => (
                    <SelectItem key={c.id} value={c.id}>
                      {c.name} - {c.address}
                    </SelectItem>
                  ))}
                  <CreateCustomerModal />
                </SelectContent>
              </Select>
            )}
          />

          <Label>Produto</Label>
          <Controller
            name="productId"
            control={control}
            render={({ field }) => (
              <Select value={field.value} onValueChange={field.onChange}>
                <SelectTrigger>
                  <SelectValue placeholder="Produto" />
                </SelectTrigger>
                <SelectContent>
                  {products.map((p) => (
                    <SelectItem key={p.id} value={p.id}>
                      {p.name} - R${p.price}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            )}
          />

          <Label htmlFor="description">Descrição</Label>
          <Input placeholder="Descrição" {...register("description")} />

          <Label htmlFor="quantity">Quantidade</Label>
          <Input type="number" placeholder="Quantidade" {...register("quantity", { valueAsNumber: true })} />

          <Label htmlFor="totalPrice">Preço Total</Label>
          <Input type="number" step="0.01" placeholder="Preço Total" {...register("totalPrice", { valueAsNumber: true })} />

          <Controller
            name="orderDay"
            control={control}
            render={({ field }) => (
              <Popover open={calendarOpen} onOpenChange={setCalendarOpen}>
                <PopoverTrigger asChild>
                  <Button variant="outline" className="w-full justify-start text-left font-normal">
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {field.value ? format(field.value, "dd/MM/yyyy") : "Data do pedido"}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <Calendar
                    mode="single"
                    locale={ptBR}
                    selected={field.value}
                    onSelect={(date) => {
                      if (date) {
                        setValue("orderDay", date, { shouldValidate: true })
                        setCalendarOpen(false)
                      }
                    }}
                    autoFocus
                  />
                </PopoverContent>
              </Popover>
            )}
          />

          <Controller
            name="status"
            control={control}
            render={({ field }) => (
              <Select onValueChange={field.onChange} value={field.value}>
                <SelectTrigger>
                  <SelectValue placeholder="Status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="pendente">Pendente</SelectItem>
                  <SelectItem value="pago">Pago</SelectItem>
                  <SelectItem value="entregue">Entregue</SelectItem>
                </SelectContent>
              </Select>
            )}
          />

          <Button type="submit">Salvar</Button>
        </form>
      </DialogContent>
    </Dialog>
  )
}
