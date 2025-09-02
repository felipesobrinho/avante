import { NextRequest, NextResponse } from 'next/server'
import { PrismaClient } from '../../../../generated/prisma'

const prisma = new PrismaClient()

export async function GET() {
  const products = await prisma.products.findMany({
    include: { category: true }
  })
  return NextResponse.json(products)
}

export async function POST(request: NextRequest) {
  const data = await request.json()

  const newProduct = await prisma.products.create({
    data: {
      name: data.name,
      measure: data.measure,
      price: data.price,
      productionType: data.productionType || "SOB_ENCOMENDA",
      stock: data.productionType === "EM_ESTOQUE" ? data.stock ?? 0 : null,
      categoryId: data.categoryId
    },
    include: { category: true }
  })

  return NextResponse.json(newProduct)
}

export async function PUT(request: NextRequest) {
  const data = await request.json()

  const updatedProduct = await prisma.products.update({
    where: { id: data.id },
    data: {
      name: data.name,
      measure: data.measure,
      price: data.price,
      productionType: data.productionType,
      stock: data.productionType === "EM_ESTOQUE" ? data.stock : null,
      categoryId: data.categoryId
    },
    include: { category: true }
  })

  return NextResponse.json(updatedProduct)
}

export async function DELETE(request: NextRequest) {
  const data = await request.json()

  await prisma.products.delete({
    where: { id: data.id }
  })

  return NextResponse.json({ message: 'Product deleted' })
}
