import { prisma } from "@/lib/prisma";
import { auth } from "@/lib/auth";
import { NextRequest, NextResponse } from "next/server";
import { headers } from "next/headers";

export async function POST(request: NextRequest) {
  const session = await auth.api.getSession({ headers: await headers() });
  if (!session) return NextResponse.json({ error: "No autorizado" }, { status: 401 });

  const { items, total } = await request.json();

  const order = await prisma.$transaction(async (tx) => {
    for (const item of items) {
      const product = await tx.product.findUnique({ where: { id: item.id } });

      if (!product || product.stock < item.quantity) {
        throw new Error(`Stock insuficiente para ${item.id}`);
      }

      await tx.product.update({
        where: { id: item.id },
        data: { stock: product.stock - item.quantity },
      });
    }

    return tx.order.create({
      data: {
        userId: session.user.id,
        totalPrice: total,
        state: "pendiente",
        orderItems: {
          create: items.map((item: { id: string; price: number; quantity: number }) => ({
            productId: item.id,
            price: item.price,
            amount: item.quantity,
          })),
        },
      },
    });
  });

  return NextResponse.json(order);
}