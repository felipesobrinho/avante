import { NextResponse } from "next/server"
import { PrismaClient } from "../../../../../generated/prisma"

const prisma = new PrismaClient()

export async function GET(
  _req: Request,
  ctx: { params: Promise<{ id: string }> }
) {
  const { id } = await ctx.params

  const order = await prisma.orders.findUnique({
    where: { id },
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
