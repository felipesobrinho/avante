import { NextRequest, NextResponse } from 'next/server'
import { PrismaClient } from '../../../../generated/prisma'

const prisma = new PrismaClient()

export async function GET() {
  const customers = await prisma.customers.findMany()
  return NextResponse.json(customers)
}

export async function POST(request: NextRequest) {
  const data = await request.json()
  const newCustomer = await prisma.customers.create({
    data: {
      name: data.name,
      address: data.address,
      phone: data.phone,
    },
  })
  return NextResponse.json(newCustomer)
}

export async function PUT(request: NextRequest) {
  const data = await request.json()
  const updatedCustomer = await prisma.customers.update({
    where: { id: data.id },
    data: {
      name: data.name,
      address: data.address,
      phone: data.phone,
    },
  })
  return NextResponse.json(updatedCustomer)
}

export async function DELETE(request: NextRequest) {
  const data = await request.json()
  await prisma.customers.delete({
    where: { id: data.id },
  })
  return NextResponse.json({ message: 'Customer deleted' })
}