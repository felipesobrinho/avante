import { NextRequest, NextResponse } from "next/server"
import { PrismaClient } from "../../../../../generated/prisma"

const prisma = new PrismaClient()

export async function GET(
  request: NextRequest,
  context: { params: Promise<{ id: string }> }
) {
  const { id } = await context.params

  try {
    const product = await prisma.products.findUnique({
      where: { id },
    })

    if (!product) {
      return NextResponse.json({ error: "Produto não encontrado" }, { status: 404 })
    }

    return NextResponse.json(product)
  } catch (error) {
    return NextResponse.json({ error: "Erro ao buscar produto" }, { status: 500 })
  }
}
