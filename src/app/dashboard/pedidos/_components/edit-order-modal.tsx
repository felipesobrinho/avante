"use client"

import { useEffect, useState } from "react"
import { Controller, useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import {
  Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
  Select, SelectContent, SelectItem, SelectTrigger, SelectValue
} from "@/components/ui/select"
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
import ItemsRepeater from "./item-repeater"
import { OrderItemInput } from "@/utils/types/order"

const itemSchema = z.object({
  productId: z.string().min(1, "Selecione um produto"),
  quantity: z.number().min(1, "Qtd mínima 1"),
  unitPrice: z.number().min(1, "Val. Unit. mínimo 1")
})

const orderSchema = z.object({
  id: z.string(),
  description: z.string().optional(),
  status: z.enum(["pendente", "pago", "entregue"]),
  orderDay: z.date({ error: "Selecione o dia do pedido!" }),
  customerId: z.string().min(1, "Selecione um cliente"),
  items: z.array(itemSchema).min(1, "Adicione pelo menos um item"),
})

type OrderFormData = z.infer<typeof orderSchema>

const compactItems = (items: OrderFormData["items"]) => {
  const map = new Map<string, { productId: string; quantity: number; unitPrice?: number; }>()
  for (const it of items) {
    const key = it.productId
    const prev = map.get(key)
    if (!prev) {
      map.set(key, { ...it })
    } else {
      map.set(key, {
        productId: key,
        quantity: (prev.quantity ?? 0) + (it.quantity ?? 0),
        unitPrice: prev.unitPrice ?? it.unitPrice,
      })
    }
  }
  return Array.from(map.values())
}

export function EditOrderModal({ orderId }: { orderId: string }) {
  const [calendarOpen, setCalendarOpen] = useState(false)
  const [modalOpen, setModalOpen] = useState(false)

  const { customers, fetchCustomers } = useCustomersStore()
  const { products, fetchProducts } = useProductsStore()
  const { editOrder } = useOrdersStore()

  const {
    register,
    handleSubmit,
    setValue,
    control,
    reset,
    watch,
    formState: { errors },
  } = useForm<OrderFormData>({
    resolver: zodResolver(orderSchema),
    defaultValues: { items: [] as OrderFormData["items"] },
  })

  const items = watch("items")

  useEffect(() => {
  if (orderId) {
    fetch(`/api/pedidos/${orderId}`)
      .then((res) => res.json())
      .then((order) => {
        if (!order) return
        setValue("id", order.id)
        setValue("description", order.description ?? "")
        setValue("status", order.status)
        setValue("orderDay", order.orderDay ? new Date(order.orderDay) : new Date())
        setValue("customerId", order.customerId)
        setValue(
          "items",
          Array.isArray(order.items)
            ? order.items.map((it: OrderItemInput ) => ({
                productId: it.productId,
                quantity: Number(it.quantity ?? 1),
                unitPrice: it.unitPrice != null ? Number(it.unitPrice) : undefined,
              }))
            : []
        )
      })
      .catch(console.error)
  }
  fetchCustomers()
  fetchProducts()
}, [orderId, setValue, fetchCustomers, fetchProducts])

  const setItems = (v: OrderFormData["items"]) => setValue("items", v, { shouldValidate: true })

  const onSubmit = async (data: OrderFormData) => {
    const merged = compactItems(data.items)
    await editOrder({
      id: data.id,
      description: data.description,
      status: data.status,
      orderDay: data.orderDay!,
      customerId: data.customerId,
      items: merged,
    })
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
          <input type="hidden" {...register("id")} />

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
          {errors.customerId && <p className="text-red-500 text-sm font-bold">{errors.customerId.message}</p>}

          <ItemsRepeater products={products} value={items ?? []} onChange={setItems} />

          {errors.items && <p className="text-red-500 text-sm font-bold">{errors.items.message as string}</p>}

          <Label>Data do Pedido</Label>
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
          {errors.orderDay && <p className="text-red-500 text-sm font-bold">{errors.orderDay.message}</p>}

          <Label>Status</Label>
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

          <Label>Observação</Label>
          <Input placeholder="Observação" {...register("description")} />

          <Button type="submit">Salvar</Button>
        </form>
      </DialogContent>
    </Dialog>
  )
}
