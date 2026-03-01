"use client";

import { useCart } from "@/components/cart-provider";
import { Button } from "@/components/ui/button";
import { authClient } from "@/lib/auth-client";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function CheckoutPage() {
  const { items, total, clearCart } = useCart();
  const { data: session } = authClient.useSession();
  const router = useRouter();

  useEffect(() => {
    if (session === null) {
      router.push("/login");
    }
  }, [session, router]);

  async function handleConfirm() {
    const response = await fetch("/api/orders", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ items, total }),
    });

    if (response.ok) {
      clearCart();
      router.push("/orders");
    }
  }

  if (!session) return null;

  return (
    <main className="max-w-2xl mx-auto px-6 py-10">
      <h1 className="text-3xl font-bold mb-8">Confirmar compra</h1>
      <div className="flex flex-col gap-4 mb-8">
        {items.map((item) => (
          <div key={item.id} className="border rounded-xl p-4 flex justify-between">
            <div>
              <p className="font-semibold">{item.name}</p>
              <p className="text-zinc-500 text-sm">Cantidad: {item.quantity}</p>
            </div>
            <p className="font-bold">${(item.price * item.quantity).toFixed(2)}</p>
          </div>
        ))}
      </div>
      <div className="border-t pt-4 flex items-center justify-between">
        <p className="text-xl font-bold">Total: ${total.toFixed(2)}</p>
        <Button onClick={handleConfirm}>Confirmar pedido</Button>
      </div>
    </main>
  );
}