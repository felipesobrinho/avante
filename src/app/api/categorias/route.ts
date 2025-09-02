import { NextRequest, NextResponse } from 'next/server'
import { PrismaClient } from '../../../../generated/prisma'

const prisma = new PrismaClient()

export async function GET() {
  const categories = await prisma.category.findMany({
    include: { products: true }
  })
  return NextResponse.json(categories)
}

export async function POST(request: NextRequest) {
  const data = await request.json()

  const newCategory = await prisma.category.create({
    data: {
      name: data.name
    }
  })

  return NextResponse.json(newCategory)
}

export async function PUT(request: NextRequest) {
  const data = await request.json()

  const updatedCategory = await prisma.category.update({
    where: { id: data.id },
    data: {
      name: data.name
    }
  })

  return NextResponse.json(updatedCategory)
}

export async function DELETE(request: NextRequest) {
  const data = await request.json()

  await prisma.category.delete({
    where: { id: data.id }
  })

  return NextResponse.json({ message: 'Category deleted' })
}
