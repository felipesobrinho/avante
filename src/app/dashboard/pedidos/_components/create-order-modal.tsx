import { useEffect, useState } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { useOrdersStore } from "@/stores/useOrdersStore"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Calendar } from "@/components/ui/calendar"
import { Calendar as CalendarIcon } from "lucide-react"
import { format } from "date-fns"
import * as z from "zod"
import { ptBR } from "date-fns/locale"
import { Label } from "@/components/ui/label"
import { useCustomersStore } from "@/stores/useCustomerStore"
import { CreateCustomerModal } from "../../clientes/_components/create-customer-modal"
import { useProductsStore } from "@/stores/useProductsStore"
import ItemsRepeater from "./item-repeater"

const itemSchema = z.object({ 
  productId: z.string().min(1, "Selecione um produto"), 
  quantity: z.number().min(1, "Qtd mínima 1"), 
  unitPrice: z.number().min(1, "Val. Unit. mínimo 1")
})

const orderSchema = z.object({
  description: z.string().optional(),
  status: z.enum(["pendente", "pago", "entregue"]),
  orderDay: z.date({ error: "Selecione o dia do pedido!" }),
  customerId: z.string().min(1, "Selecione um cliente"),
  items: z.array(itemSchema).min(1, "Adicione pelo menos um item"),
}).superRefine((data, ctx) => {
  const ids = data.items.map(i => i.productId).filter(Boolean)
  const dup = ids.find((id, idx) => ids.indexOf(id) !== idx)
  if (dup) {
    ctx.addIssue({
      code: z.ZodIssueCode.custom,
      path: ["items"],
      message: "Há produtos repetidos na lista.",
    })
  }
})

type OrderFormData = z.infer<typeof orderSchema>

export function OrderModal() {
  const { addOrder } = useOrdersStore()
  const { customers, fetchCustomers } = useCustomersStore()
  const { products, fetchProducts } = useProductsStore()

  const [calendarOpen, setCalendarOpen] = useState(false)
  const [modalOpen, setModalOpen] = useState(false)

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    reset,
    formState: { errors },
  } = useForm<OrderFormData>({
    resolver: zodResolver(orderSchema),
    defaultValues: {
      orderDay: undefined,
      items: [],
    },
  })

  useEffect(() => {
    fetchCustomers()
    fetchProducts()
  }, [fetchCustomers, fetchProducts])

  const items = watch("items")
  const orderDay = watch("orderDay")

  const setItems = (v: OrderFormData["items"]) => setValue("items", v, { shouldValidate: true })

  const onSubmit = async (data: OrderFormData) => {
    await addOrder({
      description: data.description,
      status: data.status,
      orderDay: data.orderDay!,
      customerId: data.customerId,
      items: data.items,
    })
    reset()
    setModalOpen(false)
  }

  return (
    <Dialog open={modalOpen} onOpenChange={setModalOpen}>
      <DialogTrigger asChild>
        <Button className="max-w-[300px] bg-blue-500 text-white">
          Novo Pedido
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Criar Pedido</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">

          <Label htmlFor="name">Cliente</Label>
          <Select
            onValueChange={(value) => setValue("customerId", value, { shouldValidate: true })}
          >
            <SelectTrigger>
              <SelectValue placeholder="Selecione um cliente" />
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

          {errors.customerId && (
            <p className="text-red-500 text-sm font-bold">{errors.customerId.message}</p>
          )}

          <ItemsRepeater
            products={products}
            value={items}
            onChange={setItems}
          />

          {errors.items && <p className="text-red-500 text-sm font-bold">{errors.items.message as string}</p>}

          <Label htmlFor="orderDay">Data do Pedido</Label>
          <Popover open={calendarOpen} onOpenChange={setCalendarOpen}>
            <PopoverTrigger asChild>
              <Button
                variant="outline"
                className="w-full justify-start text-left font-normal"
              >
                <CalendarIcon className="mr-2 h-4 w-4" />
                {orderDay ? format(orderDay, "dd/MM/yyyy") : "Data do pedido"}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0" align="start">
              <Calendar
                mode="single"
                locale={ptBR}
                selected={orderDay}
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

          <Label htmlFor="status">Status</Label>
          <Select
            onValueChange={(value) =>
              setValue("status", value as "pendente" | "pago" | "entregue")
            }
          >
            <SelectTrigger>
              <SelectValue placeholder="Status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="pendente">Pendente</SelectItem>
              <SelectItem value="pago">Pago</SelectItem>
              <SelectItem value="entregue">Entregue</SelectItem>
            </SelectContent>
          </Select>

          {errors.orderDay && (
            <p className="text-red-500 text-sm font-bold">{errors.orderDay.message}</p>
          )}

          <Label htmlFor="description">Observação</Label>
          <Input placeholder="Observação" {...register("description")} />

          <Button type="submit">Cadastrar Pedido</Button>
        </form>
      </DialogContent>
    </Dialog>
  )
}
