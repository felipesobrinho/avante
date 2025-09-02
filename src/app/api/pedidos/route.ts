import { NextRequest, NextResponse } from 'next/server'
import { PrismaClient } from '../../../../generated/prisma'

const prisma = new PrismaClient()

export async function GET() {
  const orders = await prisma.orders.findMany({
    include: { customer: true, product: true }
  })
  return NextResponse.json(orders)
}


export async function POST(request: NextRequest) {
  const data = await request.json()

  const product = await prisma.products.findUnique({
    where: { id: data.productId }
  })

  if (!product) {
    return NextResponse.json({ error: 'Produto não encontrado' }, { status: 400 })
  }

  if (product.productionType === 'EM_ESTOQUE') {
    if ((product.stock ?? 0) < data.quantity) {
      return NextResponse.json({ error: 'Estoque insuficiente' }, { status: 400 })
    }

    await prisma.products.update({
      where: { id: data.productId },
      data: { stock: { decrement: data.quantity } }
    })
  }

  const newOrder = await prisma.orders.create({
    data: {
      description: data.description,
      quantity: data.quantity,
      totalPrice: data.totalPrice,
      orderDay: data.orderDay ? new Date(data.orderDay) : new Date(),
      status: data.status,
      customerId: data.customerId,
      productId: data.productId
    },
    include: { customer: true, product: true }
  })

  return NextResponse.json(newOrder)
}

export async function PUT(request: NextRequest) {
  const data = await request.json()

  const updatedOrder = await prisma.orders.update({
    where: { id: data.id },
    data: {
      description: data.description,
      quantity: data.quantity,
      totalPrice: data.totalPrice,
      orderDay: data.orderDay ? new Date(data.orderDay) : new Date(),
      status: data.status,
      customerId: data.customerId,
      productId: data.productId
    },
    include: { customer: true, product: true }
  })

  return NextResponse.json(updatedOrder)
}

// excluir pedido (pode ser adicionado: estoque voltar)
export async function DELETE(request: NextRequest) {
  const data = await request.json()

  await prisma.orders.delete({
    where: { id: data.id }
  })

  return NextResponse.json({ message: 'Order deleted' })
}
