"use client";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { ProductForm } from "./product-form";
import { useState } from "react";

type Props = {
  product: {
    id: string;
    name: string;
    price: number;
    stock: number;
    image?: string | null;
  };
};

export function EditProductDialog({ product }: Props) {
  const [open, setOpen] = useState(false);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" size="sm">Editar</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Editar producto</DialogTitle>
        </DialogHeader>
        <ProductForm
          productId={product.id}
          defaultValues={{
            name: product.name,
            price: product.price,
            stock: product.stock,
            image: product.image ?? undefined,
          }}
          onSuccess={() => setOpen(false)}
        />
      </DialogContent>
    </Dialog>
  );
}