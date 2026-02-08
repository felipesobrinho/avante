"use client"

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const data = [
  { name: "Seg", produzidos: 120, entregues: 95 },
  { name: "Ter", produzidos: 140, entregues: 130 },
  { name: "Qua", produzidos: 110, entregues: 105 },
  { name: "Qui", produzidos: 160, entregues: 145 },
  { name: "Sex", produzidos: 180, entregues: 170 },
  { name: "Sáb", produzidos: 90, entregues: 85 },
];

export function OrdersChart() {
  return (
    <div className="bg-card rounded-xl p-6 shadow-sm border border-border transition-all duration-200 hover:shadow-md h-[350px]">
      <h3 className="text-lg font-semibold mb-4">Pedidos da Semana</h3>
      <ResponsiveContainer width="100%" height="85%">
        <BarChart data={data} barGap={4}>
          <CartesianGrid strokeDasharray="3 3" stroke="hsl(220, 13%, 91%)" />
          <XAxis
            dataKey="name"
            axisLine={false}
            tickLine={false}
            tick={{ fill: "hsl(220, 9%, 46%)", fontSize: 12 }}
          />
          <YAxis
            axisLine={false}
            tickLine={false}
            tick={{ fill: "hsl(220, 9%, 46%)", fontSize: 12 }}
          />
          <Tooltip
            contentStyle={{
              backgroundColor: "hsl(0, 0%, 100%)",
              border: "1px solid hsl(220, 13%, 91%)",
              borderRadius: "8px",
              boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1)",
            }}
          />
          <Bar
            dataKey="produzidos"
            fill="hsl(221, 83%, 53%)"
            radius={[4, 4, 0, 0]}
            name="Produzidos"
          />
          <Bar
            dataKey="entregues"
            fill="hsl(142, 76%, 36%)"
            radius={[4, 4, 0, 0]}
            name="Entregues"
          />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
