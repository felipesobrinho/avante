// app/api/pedidos/[id]/route.ts
import { NextResponse } from "next/server"
import { PrismaClient } from "../../../../../generated/prisma"

const prisma = new PrismaClient()

export async function GET(
  _req: Request,
  { params }: { params: { id: string } }
) {
  const order = await prisma.orders.findUnique({
    where: { id: params.id },
    include: {
      customer: true,
      items: { include: { product: true } },
    },
  })

  if (!order) return NextResponse.json(null, { status: 404 })

  const normalized = {
    ...order,
    totalPrice: Number(order.totalPrice ?? 0),
    items: order.items.map((it) => ({
      ...it,
      unitPrice: Number(it.unitPrice ?? 0),
    })),
  }

  return NextResponse.json(normalized)
}
