"use client";

import { useCart } from "./cart-provider";
import { Button } from "./ui/button";
import { toast } from "sonner";

type Props = {
  id: string;
  name: string;
  price: number;
};

export function AddToCartButton({ id, name, price }: Props) {
  const { addItem } = useCart();

  return (
    <Button
      size="lg"
      onClick={() => {
        addItem({ id, name, price });
        toast.success(`${name} agregado al carrito`);
      }}
    >
      Agregar al carrito
    </Button>
  );
}
