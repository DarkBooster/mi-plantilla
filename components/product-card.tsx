"use client";

import { useCart } from "./cart-provider";
import { Button } from "./ui/button";
import Image from "next/image";

type Props = {
  id: string;
  name: string;
  price: number;
  stock: number;
  image?: string | null;
};

export function ProductCard({ id, name, price, stock, image }: Props) {
  const { addItem } = useCart();

  return (
    <div className="border rounded-xl p-4 flex flex-col gap-3">
      <div className="relative h-40 w-full rounded-lg overflow-hidden bg-zinc-100 dark:bg-zinc-800">
        {image ? (
          <Image src={image} alt={name} fill className="object-cover" />
        ) : (
          <div className="h-full w-full" />
        )}
      </div>
      <h2 className="font-semibold">{name}</h2>
      <p className="text-zinc-500 text-sm">Stock: {stock}</p>
      <p className="font-bold text-lg">${price}</p>
      <Button className="mt-auto" onClick={() => addItem({ id, name, price })}>
        Agregar al carrito
      </Button>
    </div>
  );
}