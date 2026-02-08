import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

const orders = [
  {
    id: "#OP-1023",
    customer: "Usina Santa Rita",
    value: "R$ 4.200,00",
    status: "Entregue",
    date: "Hoje, 10:15",
  },
  {
    id: "#OP-1022",
    customer: "Metalúrgica Atlas",
    value: "R$ 1.850,00",
    status: "Em Produção",
    date: "Hoje, 09:40",
  },
  {
    id: "#OP-1021",
    customer: "AgroMecânica Vale",
    value: "R$ 3.600,00",
    status: "Aguardando Material",
    date: "Ontem, 17:20",
  },
  {
    id: "#OP-1020",
    customer: "Hidráulica Brasil",
    value: "R$ 980,00",
    status: "Entregue",
    date: "Ontem, 15:05",
  },
];


const statusStyles = {
  "Entregue": "bg-success/10 text-success border-success/20",
  "Em trânsito": "bg-primary/10 text-primary border-primary/20",
  "Processando": "bg-warning/10 text-warning border-warning/20",
  "Cancelado": "bg-destructive/10 text-destructive border-destructive/20",
};

export function RecentOrders() {
  return (
    <div className="bg-card rounded-xl p-6 shadow-sm border border-border transition-all duration-200 hover:shadow-md">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold">Pedidos Recentes</h3>
        <button className="text-sm text-primary hover:underline">Ver todos</button>
      </div>
      <div className="space-y-3">
        {orders.map((order) => (
          <div
            key={order.id}
            className="flex items-center justify-between py-3 border-b border-border last:border-0"
          >
            <div className="flex items-center gap-4">
              <div>
                <p className="font-medium">{order.id}</p>
                <p className="text-sm text-muted-foreground">{order.customer}</p>
              </div>
            </div>
            <div className="text-right">
              <p className="font-medium">{order.value}</p>
              <p className="text-sm text-muted-foreground">{order.date}</p>
            </div>
            <Badge
              variant="outline"
              className={cn(
                "ml-4",
                statusStyles[order.status as keyof typeof statusStyles]
              )}
            >
              {order.status}
            </Badge>
          </div>
        ))}
      </div>
    </div>
  );
}
