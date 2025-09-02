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

const orderSchema = z.object({
  description: z.string().min(1),
  quantity: z.number().min(1),
  totalPrice: z.number().min(0),
  status: z.enum(["pendente", "pago", "entregue"]),
  orderDay: z.date({ error: "Selecione o dia do pedido!" }),
  customerId: z.string().min(1, "Selecione um cliente"),
  productId: z.string().min(1, "Selecione um produto"),
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
    },
  })

  useEffect(() => {
    fetchCustomers()
    fetchProducts()
  }, [fetchCustomers, fetchProducts])

  const orderDay = watch("orderDay")

  const onSubmit = async (data: OrderFormData) => {
    await addOrder(data)
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

          <Label htmlFor="product">Produto</Label>
          <Select
            onValueChange={(value) => setValue("productId", value, { shouldValidate: true })}
          >
            <SelectTrigger>
              <SelectValue placeholder="Selecione um produto" />
            </SelectTrigger>
            <SelectContent>
              {products.map((p) => (
                <SelectItem key={p.id} value={p.id}>
                  {p.name} - {p.measure} ({p.price} R$)
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          {errors.productId && (
            <p className="text-red-500 text-sm font-bold">{errors.productId.message}</p>
          )}


          <Label htmlFor="description">Descrição</Label>
          <Input placeholder="Descrição" {...register("description")} />
          <Label htmlFor="quantity">Quantidade</Label>
          <Input
            type="number"
            placeholder="Quantidade"
            {...register("quantity", { valueAsNumber: true })}
          />
          <Label htmlFor="totalPrice">Valor</Label>
          <Input
            type="number"
            step="0.01"
            placeholder="Valor"
            {...register("totalPrice", { valueAsNumber: true })}
          />

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

          <Button type="submit">Cadastrar Pedido</Button>
        </form>
      </DialogContent>
    </Dialog>
  )
}
