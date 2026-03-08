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
};

export function AddProductDialog({ categories }: Props) {
  const [open, setOpen] = useState(false);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button>Agregar producto</Button>
      </DialogTrigger>
      <DialogContent className="overflow-y-auto max-h-[80vh]">
        <DialogHeader>
          <DialogTitle>Nuevo producto</DialogTitle>
        </DialogHeader>
        <ProductForm categories={categories} onSuccess={() => setOpen(false)} />
      </DialogContent>
    </Dialog>
  );
}