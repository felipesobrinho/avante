import { Progress } from "@/components/ui/progress";

const products = [
  { name: "Retentor Ø45 mm", sales: 320, percentage: 100 },
  { name: "Gaxeta Hidráulica 3/8\"", sales: 280, percentage: 87 },
  { name: "Bucha de Bronze Ø30 mm", sales: 215, percentage: 67 },
  { name: "Anel de Vedação NBR", sales: 190, percentage: 59 },
  { name: "Retentor Ø60 mm", sales: 160, percentage: 50 },
];


export function TopProducts() {
  return (
    <div className="bg-card rounded-xl p-6 shadow-sm border border-border transition-all duration-200 hover:shadow-md">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold">Produtos Mais Vendidos</h3>
        <button className="text-sm text-primary hover:underline">Ver todos</button>
      </div>
      <div className="space-y-4">
        {products.map((product, index) => (
          <div key={product.name} className="space-y-2">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <span className="text-sm font-medium text-muted-foreground w-5">
                  {index + 1}.
                </span>
                <span className="font-medium">{product.name}</span>
              </div>
              <span className="text-sm text-muted-foreground">{product.sales} vendas</span>
            </div>
            <Progress value={product.percentage} className="h-2" />
          </div>
        ))}
      </div>
    </div>
  );
}
