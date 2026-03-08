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

type Category = {
  id: string;
  name: string;
};

type Props = {
  categories: Category[];
  product: {
    id: string;
    name: string;
    price: number;
    stock: number;
    image?: string | null;
    description?: string | null;
    categoryId?: string | null;
  };
};

export function EditProductDialog({ categories, product }: Props) {
  const [open, setOpen] = useState(false);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" size="sm">Editar</Button>
      </DialogTrigger>
      <DialogContent className="overflow-y-auto max-h-[80vh]">
        <DialogHeader>
          <DialogTitle>Editar producto</DialogTitle>
        </DialogHeader>
        <ProductForm
          categories={categories}
          productId={product.id}
          defaultValues={{
            name: product.name,
            price: product.price,
            stock: product.stock,
            image: product.image ?? undefined,
            description: product.description ?? undefined,
            categoryId: product.categoryId ?? undefined,
          }}
          onSuccess={() => setOpen(false)}
        />
      </DialogContent>
    </Dialog>
  );
}