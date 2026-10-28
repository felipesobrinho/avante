/**
 * Seed com dados 100% FICTÍCIOS para desenvolvimento, demos e prints.
 * Nenhum cliente, telefone ou endereço real.
 *
 *   npx tsx prisma/seed.ts
 */
import { PrismaClient, ProductionType } from "../generated/prisma"

const prisma = new PrismaClient()

const categorias = ["Anéis e O-rings", "Retentores", "Peças para britador", "Desgaste industrial"] as const

const produtos: {
  name: string
  measure: string
  categoria: (typeof categorias)[number]
  productionType: ProductionType
  stock?: number
  price: number
}[] = [
  { name: "Anel O-ring NBR 70", measure: "Ø 50 x 3 mm", categoria: "Anéis e O-rings", productionType: "EM_ESTOQUE", stock: 240, price: 4.5 },
  { name: "Anel O-ring Viton", measure: "Ø 80 x 4 mm", categoria: "Anéis e O-rings", productionType: "EM_ESTOQUE", stock: 120, price: 12.9 },
  { name: "Retentor duplo lábio", measure: "40 x 62 x 8 mm", categoria: "Retentores", productionType: "EM_ESTOQUE", stock: 85, price: 18.7 },
  { name: "Retentor para cubo de roda", measure: "95 x 125 x 12 mm", categoria: "Retentores", productionType: "EM_ESTOQUE", stock: 40, price: 46 },
  { name: "Coxim do britador", measure: "Ø 120 mm", categoria: "Peças para britador", productionType: "SOB_ENCOMENDA", price: 380 },
  { name: "Bucha de impacto", measure: "200 x 150 mm", categoria: "Peças para britador", productionType: "SOB_ENCOMENDA", price: 520 },
  { name: "Régua de impacto", measure: "1200 x 150 x 25 mm", categoria: "Peças para britador", productionType: "SOB_ENCOMENDA", price: 890 },
  { name: "Revestimento antidesgaste em PU", measure: "chapa 10 mm", categoria: "Desgaste industrial", productionType: "SOB_ENCOMENDA", price: 260 },
]

const clientes = [
  { name: "Mineração Exemplo Ltda", address: "Rodovia Fictícia, km 12 — Itabirito/MG", phone: "(31) 90000-0001" },
  { name: "Pedreira Modelo S.A.", address: "Av. das Pedras, 100 — Contagem/MG", phone: "(31) 90000-0002" },
  { name: "Metalúrgica Demo", address: "Rua do Aço, 45 — Betim/MG", phone: "(31) 90000-0003" },
  { name: "Transportes Fictícios ME", address: "Rua Teste, 300 — Belo Horizonte/MG", phone: "(31) 90000-0004" },
  { name: "Agro Amostra Ltda", address: "Estrada Rural, s/n — Sete Lagoas/MG", phone: "(31) 90000-0005" },
]

// [cliente, status, dias atrás, descrição, itens: [produto, quantidade]]
const pedidos: [number, string, number, string, [number, number][]][] = [
  [0, "entregue", 12, "Reposição de vedações da linha de bombas", [[0, 60], [2, 20]]],
  [1, "pago", 7, "Peças para manutenção do britador primário", [[4, 2], [5, 4]]],
  [2, "pendente", 4, "Orçamento aprovado — régua sob medida", [[6, 2]]],
  [3, "entregue", 3, "Retentores para a frota", [[3, 8], [1, 10]]],
  [4, "pendente", 1, "Revestimento das calhas de grãos", [[7, 6], [0, 30]]],
]

async function main() {
  await prisma.orderItems.deleteMany()
  await prisma.orders.deleteMany()
  await prisma.products.deleteMany()
  await prisma.category.deleteMany()
  await prisma.customers.deleteMany()

  const cats = new Map<string, string>()
  for (const name of categorias) cats.set(name, (await prisma.category.create({ data: { name } })).id)

  const prods: { id: string }[] = []
  for (const p of produtos) {
    prods.push(
      await prisma.products.create({
        data: {
          name: p.name,
          measure: p.measure,
          productionType: p.productionType,
          stock: p.stock ?? null,
          price: p.price,
          categoryId: cats.get(p.categoria)!,
        },
      }),
    )
  }

  const custs: { id: string }[] = []
  for (const c of clientes) custs.push(await prisma.customers.create({ data: c }))

  for (const [ci, status, diasAtras, description, itens] of pedidos) {
    const orderDay = new Date(Date.now() - diasAtras * 86_400_000)
    const total = itens.reduce((acc, [pi, q]) => acc + produtos[pi].price * q, 0)
    await prisma.orders.create({
      data: {
        description,
        status,
        orderDay,
        totalPrice: total,
        customerId: custs[ci].id,
        items: { create: itens.map(([pi, q]) => ({ productId: prods[pi].id, quantity: q, unitPrice: produtos[pi].price })) },
      },
    })
  }

  console.log(`Seed fictício: ${categorias.length} categorias, ${produtos.length} produtos, ${clientes.length} clientes, ${pedidos.length} pedidos.`)
  console.log("Crie o usuário de acesso em /cadastro (ex.: demo@exemplo.com).")
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(() => prisma.$disconnect())
