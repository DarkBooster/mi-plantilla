"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { productSchema, type ProductForm as ProductFormType } from "@/lib/validations";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

type Props = {
  onSuccess?: () => void;
};

export function ProductForm({ onSuccess }: Props) {
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm({
    resolver: zodResolver(productSchema),
  });

  async function onSubmit(data: ProductFormType) {
    const response = await fetch("/api/products", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });

    if (response.ok) {
      reset();
      router.refresh();
      onSuccess?.();
    }
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
      <div className="flex flex-col gap-1">
        <Label htmlFor="name">Nombre</Label>
        <Input id="name" placeholder="Nombre del producto" {...register("name")} />
        {errors.name && <p className="text-red-500 text-sm">{errors.name.message as string}</p>}
      </div>
      <div className="flex flex-col gap-1">
        <Label htmlFor="price">Precio</Label>
        <Input id="price" type="number" step="0.01" placeholder="0.00" {...register("price")} />
        {errors.price && <p className="text-red-500 text-sm">{errors.price.message as string}</p>}
      </div>
      <div className="flex flex-col gap-1">
        <Label htmlFor="stock">Stock</Label>
        <Input id="stock" type="number" placeholder="0" {...register("stock")} />
        {errors.stock && <p className="text-red-500 text-sm">{errors.stock.message as string}</p>}
      </div>
      <Button type="submit" disabled={isSubmitting}>
        {isSubmitting ? "Guardando..." : "Guardar producto"}
      </Button>
    </form>
  );
}