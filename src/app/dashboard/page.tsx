import { SiteHeader } from "@/components/site-header"
import { StatCard } from "./_components/stat-card"
import { RevenueChart } from "./_components/revenue-chart"
import { OrdersChart } from "./_components/orders-chart"
import { RecentOrders } from "./_components/recent-orders"
import { TopProducts } from "./_components/top-products"
import { ShoppingCart, Users, Package, DollarSign } from "lucide-react"

export default function Page() {
  return (
    <div>
      <SiteHeader pageName="Painel de Controle" />

      <div className="flex flex-1 flex-col">
        <div className="@container/main flex flex-1 flex-col gap-4 px-4 py-6 lg:px-6">

          {/* STATS */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <StatCard
              title="Total de Vendas"
              value="R$ 45.231"
              change="+12.5% vs mês anterior"
              changeType="positive"
              icon={DollarSign}
              iconColor="bg-success/10 text-success"
            />

            <StatCard
              title="Pedidos"
              value="1.234"
              change="+8.2% vs mês anterior"
              changeType="positive"
              icon={ShoppingCart}
              iconColor="bg-primary/10 text-primary"
            />

            <StatCard
              title="Clientes"
              value="892"
              change="+3.1% vs mês anterior"
              changeType="positive"
              icon={Users}
              iconColor="bg-chart-4/10 text-chart-4"
            />

            <StatCard
              title="Produtos em Estoque"
              value="2.456"
              change="-2.4% vs mês anterior"
              changeType="negative"
              icon={Package}
              iconColor="bg-warning/10 text-warning"
            />
          </div>

          {/* GRÁFICOS */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <RevenueChart />
            <OrdersChart />
          </div>

          {/* LISTAS */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <RecentOrders />
            <TopProducts />
          </div>

        </div>
      </div>
    </div>
  )
}
