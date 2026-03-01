"use client";

import { useCart } from "./cart-provider";
import { Button } from "./ui/button";

type Props = {
  id: string;
  name: string;
  price: number;
  stock: number;
};

export function ProductCard({ id, name, price, stock }: Props) {
  const { addItem } = useCart();

  return (
    <div className="border rounded-xl p-4 flex flex-col gap-3">
      <div className="bg-zinc-100 dark:bg-zinc-800 rounded-lg h-40" />
      <h2 className="font-semibold">{name}</h2>
      <p className="text-zinc-500 text-sm">Stock: {stock}</p>
      <p className="font-bold text-lg">${price}</p>
      <Button
        className="mt-auto"
        onClick={() => addItem({ id, name, price })}
      >
        Agregar al carrito
      </Button>
    </div>
  );
}