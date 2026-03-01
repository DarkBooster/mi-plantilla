import { prisma } from "@/lib/prisma";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { redirect } from "next/navigation";

export default async function OrdersPage() {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session) redirect("/login");

  const orders = await prisma.order.findMany({
    where: { userId: session.user.id },
    include: { orderItems: { include: { product: true } } },
    orderBy: { createdAt: "desc" },
  });

  return (
    <main className="max-w-2xl mx-auto px-6 py-10">
      <h1 className="text-3xl font-bold mb-8">Mis pedidos</h1>
      {orders.length === 0 ? (
        <p className="text-zinc-500">No tienes pedidos aún.</p>
      ) : (
        <div className="flex flex-col gap-6">
          {orders.map((order) => (
            <div key={order.id} className="border rounded-xl p-4 flex flex-col gap-3">
              <div className="flex justify-between">
                <p className="text-sm text-zinc-500">{new Date(order.createdAt).toLocaleDateString()}</p>
                <span className="text-sm font-medium capitalize">{order.state}</span>
              </div>
              {order.orderItems.map((item) => (
                <div key={item.id} className="flex justify-between text-sm">
                  <p>{item.product.name} x{item.amount}</p>
                  <p>${(Number(item.price) * item.amount).toFixed(2)}</p>
                </div>
              ))}
              <div className="border-t pt-2 flex justify-between font-bold">
                <p>Total</p>
                <p>${Number(order.totalPrice).toFixed(2)}</p>
              </div>
            </div>
          ))}
        </div>
      )}
    </main>
  );
}