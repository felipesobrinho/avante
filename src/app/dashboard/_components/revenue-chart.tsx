"use client"
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

export const data = [
  { name: "Jan", value: 18000 },
  { name: "Fev", value: 15500 },
  { name: "Mar", value: 21000 },
  { name: "Abr", value: 19500 },
  { name: "Mai", value: 24000 },
  { name: "Jun", value: 22500 },
  { name: "Jul", value: 28000 },
  { name: "Ago", value: 26000 },
  { name: "Set", value: 30000 },
  { name: "Out", value: 28500 },
  { name: "Nov", value: 32000 },
  { name: "Dez", value: 35000 },
];

export function RevenueChart() {
  return (
    <div className="bg-card rounded-xl p-6 shadow-sm border border-border transition-all duration-200 hover:shadow-md h-[350px]">
      <h3 className="text-lg font-semibold mb-4">Receita Mensal</h3>
      <ResponsiveContainer width="100%" height="85%">
        <AreaChart data={data}>
          <defs>
            <linearGradient id="colorValue" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="hsl(221, 83%, 53%)" stopOpacity={0.3} />
              <stop offset="95%" stopColor="hsl(221, 83%, 53%)" stopOpacity={0} />
            </linearGradient>
          </defs>
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
            tickFormatter={(value) => `R$${value / 1000}k`}
          />
          <Tooltip
            contentStyle={{
              backgroundColor: "hsl(0, 0%, 100%)",
              border: "1px solid hsl(220, 13%, 91%)",
              borderRadius: "8px",
              boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1)",
            }}
            formatter={(value: number) => [`R$ ${value.toLocaleString()}`, "Receita"]}
          />
          <Area
            type="monotone"
            dataKey="value"
            stroke="hsl(221, 83%, 53%)"
            strokeWidth={2}
            fillOpacity={1}
            fill="url(#colorValue)"
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
}
