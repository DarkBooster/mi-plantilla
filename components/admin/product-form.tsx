"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { productSchema, type ProductForm } from "@/lib/validations";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { useState } from "react";
import Image from "next/image";

type Category = {
  id: string;
  name: string;
};

type Props = {
  onSuccess?: () => void;
  categories: Category[];
  defaultValues?: {
    name: string;
    price: number;
    stock: number;
    image?: string;
    description?: string;
    categoryId?: string;
  };
  productId?: string;
};

export function ProductForm({ onSuccess, categories, defaultValues, productId }: Props) {
  const router = useRouter();
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string>(defaultValues?.image || "");
  const [uploading, setUploading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm({
    resolver: zodResolver(productSchema),
    defaultValues,
  });

  function handleImageChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;
    setImageFile(file);
    setImagePreview(URL.createObjectURL(file));
  }

  async function uploadImage(): Promise<string | null> {
    if (!imageFile) return defaultValues?.image || null;
    setUploading(true);
    const formData = new FormData();
    formData.append("file", imageFile);
    const res = await fetch("/api/upload", { method: "POST", body: formData });
    const data = await res.json();
    setUploading(false);
    return data.secure_url;
  }

  async function onSubmit(data: ProductForm) {
    const imageUrl = await uploadImage();
    const url = productId ? `/api/products/${productId}` : "/api/products";
    const method = productId ? "PATCH" : "POST";

    const response = await fetch(url, {
      method,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ ...data, image: imageUrl }),
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
      <div className="flex flex-col gap-1">
        <Label htmlFor="description">Descripción</Label>
        <textarea
          id="description"
          placeholder="Descripción del producto..."
          className="border rounded-md px-3 py-2 text-sm bg-background resize-none h-24 w-full"
          {...register("description")}
        />
      </div>
      <div className="flex flex-col gap-1">
        <Label htmlFor="categoryId">Categoría</Label>
        <select
          id="categoryId"
          className="border rounded-md px-3 py-2 text-sm bg-background w-full"
          {...register("categoryId")}
        >
          <option value="">Sin categoría</option>
          {categories.map((cat) => (
            <option key={cat.id} value={cat.id}>
              {cat.name}
            </option>
          ))}
        </select>
      </div>
      <div className="flex flex-col gap-1">
        <Label htmlFor="image">Imagen</Label>
        {imagePreview && (
          <div className="relative h-32 w-full mb-2">
            <Image src={imagePreview} alt="Preview" fill className="object-cover rounded-lg" />
          </div>
        )}
        <Input id="image" type="file" accept="image/*" onChange={handleImageChange} />
      </div>
      <Button type="submit" disabled={isSubmitting || uploading}>
        {uploading ? "Subiendo imagen..." : isSubmitting ? "Guardando..." : "Guardar producto"}
      </Button>
    </form>
  );
}