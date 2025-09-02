import { NextRequest, NextResponse } from "next/server"
import { PrismaClient } from "../../../../../generated/prisma"

const prisma = new PrismaClient()

export async function GET(
  request: NextRequest,
  context: { params: Promise<{ id: string }> }
) {
  const { id } = await context.params

  try {
    const category = await prisma.category.findUnique({
      where: { id },
    })

    if (!category) {
      return NextResponse.json({ error: "Categoria não encontrada" }, { status: 404 })
    }

    return NextResponse.json(category)
  } catch (error) {
    return NextResponse.json({ error: "Erro ao buscar categoria" }, { status: 500 })
  }
}
