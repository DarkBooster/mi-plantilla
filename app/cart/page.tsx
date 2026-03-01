"use client";

import { useCart } from "@/components/cart-provider";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

export default function CartPage() {
  const { items, removeItem, clearCart, total } = useCart();
  const router = useRouter();

  if (items.length === 0) {
    return (
      <main className="max-w-2xl mx-auto px-6 py-10 text-center">
        <h1 className="text-3xl font-bold mb-4">Tu carrito</h1>
        <p className="text-zinc-500 mb-6">No tienes productos en el carrito.</p>
        <Button onClick={() => router.push("/")}>Ver catálogo</Button>
      </main>
    );
  }

  return (
    <main className="max-w-2xl mx-auto px-6 py-10">
      <h1 className="text-3xl font-bold mb-8">Tu carrito</h1>
      <div className="flex flex-col gap-4">
        {items.map((item) => (
          <div key={item.id} className="border rounded-xl p-4 flex items-center justify-between">
            <div>
              <p className="font-semibold">{item.name}</p>
              <p className="text-zinc-500 text-sm">Cantidad: {item.quantity}</p>
              <p className="font-bold">${(item.price * item.quantity).toFixed(2)}</p>
            </div>
            <Button variant="destructive" size="sm" onClick={() => removeItem(item.id)}>
              Eliminar
            </Button>
          </div>
        ))}
      </div>
      <div className="mt-8 border-t pt-4 flex items-center justify-between">
        <p className="text-xl font-bold">Total: ${total.toFixed(2)}</p>
        <div className="flex gap-3">
          <Button variant="outline" onClick={clearCart}>Vaciar carrito</Button>
          <Button onClick={() => router.push("/checkout")}>Finalizar compra</Button>
        </div>
      </div>
    </main>
  );
}