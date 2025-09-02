import { NextRequest, NextResponse } from "next/server"
import { PrismaClient } from "../../../../../generated/prisma"

const prisma = new PrismaClient()

export async function GET(
  request: NextRequest,
  context: { params: Promise<{ id: string }> }
) {
  const { id } = await context.params

  try {
    const customer = await prisma.customers.findUnique({
      where: { id },
    })

    if (!customer) {
      return NextResponse.json({ error: "Cliente não encontrado" }, { status: 404 })
    }

    return NextResponse.json(customer)
  } catch (error) {
    return NextResponse.json({ error: "Erro ao buscar cliente" }, { status: 500 })
  }
}
