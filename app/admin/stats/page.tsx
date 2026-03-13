import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { StockTable } from "@/components/admin/stock-table";

export default async function StatsPage() {
  const session = await auth.api.getSession({ headers: await headers() });
  if (!session) redirect("/");

  const user = await prisma.user.findUnique({
    where: { id: session.user.id },
    select: { role: true },
  });
  if (!user || user.role !== "admin") redirect("/");

  const now = new Date();
  const firstDayOfMonth = new Date(now.getFullYear(), now.getMonth(), 1);

  const [totalRevenue, monthlyOrders, totalUsers, topProduct, products] =
    await Promise.all([
      prisma.order.aggregate({ _sum: { totalPrice: true } }),
      prisma.order.count({ where: { createdAt: { gte: firstDayOfMonth } } }),
      prisma.user.count(),
      prisma.orderItem.groupBy({
        by: ["productId"],
        _sum: { amount: true },
        orderBy: { _sum: { amount: "desc" } },
        take: 1,
      }),
      prisma.product.findMany({ orderBy: { stock: "asc" } }),
    ]);

  const topProductData = topProduct[0]
    ? await prisma.product.findUnique({ where: { id: topProduct[0].productId } })
    : null;

  const stats = [
    {
      label: "Ingresos totales",
      value: `$${Number(totalRevenue._sum.totalPrice ?? 0).toFixed(2)}`,
    },
    {
      label: "Órdenes este mes",
      value: monthlyOrders,
    },
    {
      label: "Producto más vendido",
      value: topProductData?.name ?? "Sin datos",
    },
    {
      label: "Usuarios registrados",
      value: totalUsers,
    },
  ];

  return (
    <main className="max-w-4xl mx-auto px-6 py-10">
      <h1 className="text-3xl font-bold mb-8">Estadísticas</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-10">
        {stats.map((stat) => (
          <div key={stat.label} className="border rounded-xl p-4 flex flex-col gap-1">
            <p className="text-sm text-zinc-500">{stat.label}</p>
            <p className="text-2xl font-bold">{stat.value}</p>
          </div>
        ))}
      </div>
      <h2 className="text-xl font-bold mb-4">Stock de productos</h2>
      <StockTable products={products.map((p) => ({
        id: p.id,
        name: p.name,
        stock: p.stock,
        price: Number(p.price),
      }))} />
    </main>
  );
}