"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

type Product = {
  id: string;
  name: string;
  stock: number;
  price: number;
};

type Props = {
  products: Product[];
};

export function StockTable({ products }: Props) {
  const router = useRouter();
  const [editing, setEditing] = useState<string | null>(null);
  const [newStock, setNewStock] = useState<number>(0);
  const [loading, setLoading] = useState(false);

  async function handleSave(id: string) {
    setLoading(true);
    await fetch(`/api/products/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ stock: newStock }),
    });
    setLoading(false);
    setEditing(null);
    router.refresh();
  }

  return (
    <div className="border rounded-xl overflow-hidden">
      <table className="w-full text-sm">
        <thead className="bg-zinc-100 dark:bg-zinc-800">
          <tr>
            <th className="text-left px-4 py-3">Producto</th>
            <th className="text-left px-4 py-3">Precio</th>
            <th className="text-left px-4 py-3">Stock</th>
            <th className="text-left px-4 py-3">Acción</th>
          </tr>
        </thead>
        <tbody>
          {products.map((product) => (
            <tr
              key={product.id}
              className={`border-t ${product.stock < 5 ? "bg-red-500/10" : ""}`}
            >
              <td className="px-4 py-3 flex items-center gap-2">
                {product.name}
                {product.stock < 5 && (
                  <span className="text-xs text-red-500 font-medium">Stock bajo</span>
                )}
              </td>
              <td className="px-4 py-3">${product.price.toFixed(2)}</td>
              <td className="px-4 py-3">
                {editing === product.id ? (
                  <Input
                    type="number"
                    value={newStock}
                    onChange={(e) => setNewStock(Number(e.target.value))}
                    className="w-24"
                    min={0}
                  />
                ) : (
                  product.stock
                )}
              </td>
              <td className="px-4 py-3">
                {editing === product.id ? (
                  <div className="flex gap-2">
                    <Button size="sm" disabled={loading} onClick={() => handleSave(product.id)}>
                      {loading ? "Guardando..." : "Guardar"}
                    </Button>
                    <Button size="sm" variant="outline" onClick={() => setEditing(null)}>
                      Cancelar
                    </Button>
                  </div>
                ) : (
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => {
                      setEditing(product.id);
                      setNewStock(product.stock);
                    }}
                  >
                    Editar stock
                  </Button>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}