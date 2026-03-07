"use client";

import { useCart } from "./cart-provider";
import { Button } from "./ui/button";

type Props = {
  id: string;
  name: string;
  price: number;
};

export function AddToCartButton({ id, name, price }: Props) {
  const { addItem } = useCart();

  return (
    <Button size="lg" onClick={() => addItem({ id, name, price })}>
      Agregar al carrito
    </Button>
  );
}