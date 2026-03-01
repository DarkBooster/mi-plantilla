import { prisma } from "@/lib/prisma";
import { auth } from "@/lib/auth";
import { NextRequest, NextResponse } from "next/server";
import { headers } from "next/headers";

export async function POST(request: NextRequest) {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session) {
    return NextResponse.json({ error: "No autorizado" }, { status: 401 });
  }

  const body = await request.json();
  const { items, total } = body;

  const order = await prisma.order.create({
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

  return NextResponse.json(order);
}