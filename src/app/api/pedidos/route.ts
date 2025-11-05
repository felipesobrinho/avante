import { NextRequest, NextResponse } from "next/server"
import { PrismaClient } from "../../../../generated/prisma"

const prisma = new PrismaClient()

type OrderItemInput = {
  productId: string
  quantity: number
  unitPrice?: number
}

type EnrichedItem = OrderItemInput & {
  product?: {
    id: string
    price: any | null
    productionType: "SOB_ENCOMENDA" | "EM_ESTOQUE"
    stock: number | null
  }
}

function toNumber(n: any) { return Number(n ?? 0) }

async function enrichItems(items: OrderItemInput[]): Promise<EnrichedItem[]> {
  const ids = [...new Set(items.map(i => i.productId))]
  const products = await prisma.products.findMany({
    where: { id: { in: ids } },
    select: { id: true, price: true, productionType: true, stock: true },
  })
  const map = new Map(products.map(p => [p.id, p]))
  return items.map(i => {
    const p = map.get(i.productId)
    return {
      ...i,
      unitPrice: i.unitPrice ?? toNumber(p?.price),
      product: p ? {
        id: p.id,
        price: p.price,
        productionType: p.productionType,
        stock: (p.stock as unknown as number) ?? null,
      } : undefined,
    }
  })
}

function normalizeOrders(orders: any) {
  return orders.map(o => ({
    ...o,
    totalPrice: toNumber(o.totalPrice),
    items: o.items.map((it: any) => ({
      ...it,
      unitPrice: toNumber(it.unitPrice),
      product: it.product ? { ...it.product, price: toNumber(it.product.price) } : null,
    })),
  }))
}

export async function GET() {
  const orders = await prisma.orders.findMany({
    include: { customer: true, items: { include: { product: true } } },
    orderBy: { createdAt: "desc" },
  })
  return NextResponse.json(normalizeOrders(orders))
}

export async function POST(req: NextRequest) {
  const data = await req.json()
  const raw: OrderItemInput[] = Array.isArray(data.items) ? data.items : []
  if (raw.length === 0) return NextResponse.json({ error: "Informe items[]" }, { status: 400 })

  const items = await enrichItems(raw)

  for (const it of items) {
    if (it.product?.productionType === "EM_ESTOQUE") {
      const stock = toNumber(it.product.stock)
      if (stock < it.quantity) {
        return NextResponse.json({ error: `Estoque insuficiente para ${it.productId}` }, { status: 400 })
      }
    }
  }

  const total = items.reduce((acc, it) => acc + toNumber(it.unitPrice) * it.quantity, 0)

  const created = await prisma.$transaction(async (tx) => {
    for (const it of items) {
      if (it.product?.productionType === "EM_ESTOQUE") {
        await tx.products.update({
          where: { id: it.productId },
          data: { stock: { decrement: it.quantity } },
        })
      }
    }

    const order = await tx.orders.create({
      data: {
        description: data.description ?? null,
        totalPrice: total,
        orderDay: data.orderDay ? new Date(data.orderDay) : new Date(),
        status: data.status ?? "PENDING",
        customerId: data.customerId,
        items: {
          create: items.map(it => ({
            productId: it.productId,
            quantity: it.quantity,
            unitPrice: toNumber(it.unitPrice),
          })),
        },
      },
      include: { customer: true, items: { include: { product: true } } },
    })

    return order
  })

  return NextResponse.json(normalizeOrders([created])[0], { status: 201 })
}

export async function PUT(req: NextRequest) {
  const data = await req.json()
  if (!data.id) return NextResponse.json({ error: "id é obrigatório" }, { status: 400 })

  const order = await prisma.orders.findUnique({
    where: { id: data.id },
    include: { items: { include: { product: true } } },
  })
  if (!order) return NextResponse.json({ error: "Pedido não encontrado" }, { status: 404 })

  const raw: OrderItemInput[] = Array.isArray(data.items) ? data.items : []
  const items = await enrichItems(raw)

  const prevByProd = new Map(order.items.map(it => [it.productId, it]))
  const nextByProd = new Map(items.map(it => [it.productId, it]))

  for (const [pid, next] of nextByProd.entries()) {
    const prev = prevByProd.get(pid)
    const delta = (next.quantity ?? 0) - (prev?.quantity ?? 0)
    if (delta > 0 && next.product?.productionType === "EM_ESTOQUE") {
      const stock = toNumber(next.product.stock)
      if (stock < delta) {
        return NextResponse.json({ error: `Estoque insuficiente para ${pid}` }, { status: 400 })
      }
    }
  }

  const total = items.reduce((acc, it) => acc + toNumber(it.unitPrice) * it.quantity, 0)

  const updated = await prisma.$transaction(async (tx) => {
    for (const [pid, prev] of prevByProd.entries()) {
      if (!nextByProd.has(pid) && prev.product.productionType === "EM_ESTOQUE") {
        await tx.products.update({ where: { id: pid }, data: { stock: { increment: prev.quantity } } })
      }
    }
    for (const [pid, next] of nextByProd.entries()) {
      const prev = prevByProd.get(pid)
      const delta = (next.quantity ?? 0) - (prev?.quantity ?? 0)
      if (delta !== 0 && next.product?.productionType === "EM_ESTOQUE") {
        await tx.products.update({
          where: { id: pid },
          data: { stock: { [delta > 0 ? "decrement" : "increment"]: Math.abs(delta) } },
        })
      }
    }

    await tx.orderItems.deleteMany({ where: { orderId: data.id } })
    await tx.orderItems.createMany({
      data: items.map(it => ({
        orderId: data.id,
        productId: it.productId,
        quantity: it.quantity,
        unitPrice: toNumber(it.unitPrice),
      })),
    })

    const ord = await tx.orders.update({
      where: { id: data.id },
      data: {
        description: data.description ?? order.description,
        totalPrice: total,
        orderDay: data.orderDay ? new Date(data.orderDay) : order.orderDay ?? new Date(),
        status: data.status ?? order.status,
        customerId: data.customerId ?? order.customerId,
      },
      include: { customer: true, items: { include: { product: true } } },
    })

    return ord
  })

  return NextResponse.json(normalizeOrders([updated])[0])
}

export async function DELETE(req: NextRequest) {
  const data = await req.json()
  if (!data.id) return NextResponse.json({ error: "id é obrigatório" }, { status: 400 })

  await prisma.$transaction(async (tx) => {
    const items = await tx.orderItems.findMany({
      where: { orderId: data.id },
      include: { product: true },
    })
    for (const it of items) {
      if (it.product.productionType === "EM_ESTOQUE") {
        await tx.products.update({
          where: { id: it.productId },
          data: { stock: { increment: it.quantity } },
        })
      }
    }
    await tx.orderItems.deleteMany({ where: { orderId: data.id } })
    await tx.orders.delete({ where: { id: data.id } })
  })

  return NextResponse.json({ message: "Order deleted" })
}
