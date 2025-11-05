// "use client"

// import { Area, AreaChart, CartesianGrid, XAxis } from "recharts"

// import {
//   Card,
//   CardAction,
//   CardContent,
//   CardDescription,
//   CardHeader,
//   CardTitle,
// } from "@/components/ui/card"
// import {
//   ChartContainer,
//   ChartTooltip,
//   ChartTooltipContent,
// } from "@/components/ui/chart"
// import {
//   ToggleGroup,
//   ToggleGroupItem,
// } from "@/components/ui/toggle-group"
// import { useOrdersStore } from "@/stores/useOrdersStore"
// import { useEffect, useMemo, useState } from "react"

// export function ChartAreaInteractive() {
//   const { orders, fetchOrders, isLoading } = useOrdersStore()
//   const [timeRange, setTimeRange] = useState("90d")

//   useEffect(() => {
//     fetchOrders()
//   }, [fetchOrders])

//   const chartData = useMemo(() => {
//     const grouped: Record<string, number> = {}

//     orders.forEach((order) => {
//       const date = new Date(order.orderDay)

//       const year = date.getUTCFullYear()
//       const month = String(date.getUTCMonth() + 1).padStart(2, "0")
//       const day = String(date.getUTCDate()).padStart(2, "0")

//       const dateKey = `${year}-${month}-${day}`
//       grouped[dateKey] = (grouped[dateKey] || 0) + 1
//     })
//     return Object.entries(grouped)
//       .map(([date, count]) => ({
//         date,
//         count,
//       }))
//       .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())

//   }, [orders])

//   const filteredData = useMemo(() => {
//     if (!chartData?.length) return []

//     const referenceDate = new Date()
//     let daysToSubtract = 90
//     if (timeRange === "30d") daysToSubtract = 30
//     if (timeRange === "7d") daysToSubtract = 7

//     const startDate = new Date(referenceDate)
//     startDate.setDate(startDate.getDate() - daysToSubtract)

//     return chartData.filter((item) => new Date(item.date) >= startDate)
//   }, [chartData, timeRange])

//   return (
//     <Card>
//       <CardHeader>
//         <CardTitle>Pedidos</CardTitle>
//         <CardDescription>
//           {isLoading ? "Carregando pedidos..." : "Evolução dos pedidos"}
//         </CardDescription>
//         <CardAction>
//           <ToggleGroup
//             type="single"
//             value={timeRange}
//             onValueChange={setTimeRange}
//             variant="outline"
//           >
//             <ToggleGroupItem value="90d">90 dias</ToggleGroupItem>
//             <ToggleGroupItem value="30d">30 dias</ToggleGroupItem>
//             <ToggleGroupItem value="7d">7 dias</ToggleGroupItem>
//           </ToggleGroup>
//         </CardAction>
//       </CardHeader>
//       <CardContent>
//         <ChartContainer
//           config={{
//             pedidos: { label: "Pedidos", color: "var(--primary)" },
//           }}
//           className="aspect-auto h-[250px] w-full"
//         >
//           <AreaChart data={filteredData}>
//             <CartesianGrid vertical={false} />
//             <XAxis
//               dataKey="date"
//               tickFormatter={(date) => {
//                 const [y, m, d] = date?.split('-');
//                 return `${d}/${m}`;
//               }}
//             />
//             <ChartTooltip
//               content={
//                 <ChartTooltipContent
//                   labelFormatter={(value) => {
//                     if (!value) return ""
//                     const dateStr = String(value)
//                     const [y, m, d] = dateStr.split("-")
//                     return `${d}/${m}/${y}`
//                   }}
//                 />
//               }
//             />
//             <Area
//               name="Pedidos:"
//               dataKey="count"
//               type="monotone"
//               stroke="var(--primary)"
//               fill="var(--primary)"
//               fillOpacity={0.3}
//             />
//           </AreaChart>
//         </ChartContainer>
//       </CardContent>
//     </Card>
//   )
// }
