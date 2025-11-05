import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

export default function ItemsRepeater({
  products,
  value,
  onChange,
}: {
  products: { id: string; name: string; measure?: string | null}[]
  value: Array<{ productId: string; quantity: number; unitPrice?: number; discount?: number }>
  onChange: (v: Array<{ productId: string; quantity: number; unitPrice?: number; discount?: number }>) => void
}) {
  const add = () => onChange([...value, { productId: "", quantity: 1 }])
  const remove = (idx: number) => onChange(value.filter((_, i) => i !== idx))
  const setAt = (idx: number, patch: Partial<(typeof value)[number]>) =>
    onChange(value.map((it, i) => (i === idx ? { ...it, ...patch } : it)))

  const selectedIds = value.map(v => v.productId).filter(Boolean)
  const canAddMore = products.length > value.length

  return (
    <div className="space-y-3">
      <div className="flex justify-between items-center">
        <Label>Itens do pedido</Label>
        <Button type="button" variant="outline" onClick={add} disabled={!canAddMore}>
          + Item
        </Button>
      </div>

      {value.map((it, idx) => {
        const available = products.filter(p =>
          p.id === it.productId || !selectedIds.includes(p.id)
        )

        return (
          <div key={idx} className="grid grid-cols-12 gap-2 items-end">
            <div className="col-span-6">
              <Label>Produto</Label>
              <Select
                value={it.productId}
                onValueChange={(v) => setAt(idx, { productId: v })}
              >
                <SelectTrigger><SelectValue placeholder="Selecione um produto" /></SelectTrigger>
                <SelectContent>
                  {available.map(p => (
                    <SelectItem key={p.id} value={p.id}>
                      {p.name} - {p.measure ?? "-"}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="col-span-2">
              <Label>Qtd</Label>
              <Input
                type="number"
                min={1}
                step={1}
                value={it.quantity}
                onChange={(e) => setAt(idx, { quantity: Number(e.target.value) })}
              />
            </div>

            <div className="col-span-2">
              <Label>Unit (opc.)</Label>
              <Input
                type="number"
                min={1}
                step={1}
                value={it.unitPrice ?? ""}
                onChange={(e) => setAt(idx, { unitPrice: e.target.value === "" ? undefined : Number(e.target.value) })}
              />
            </div>
            
            <div className="col-span-12">
              <Button type="button" variant="ghost" onClick={() => remove(idx)}>Remover</Button>
            </div>
          </div>
        )
      })}
    </div>
  )
}