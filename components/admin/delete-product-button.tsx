"use client";

import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

type Props = {
  id: string;
};

export function DeleteProductButton({ id }: Props) {
  const router = useRouter();

  async function handleDelete() {
    const confirmed = confirm("¿Estás seguro que quieres eliminar este producto?");
    if (!confirmed) return;

    const response = await fetch(`/api/products/${id}`, {
      method: "DELETE",
    });

    if (response.ok) {
      router.refresh();
    }
  }

  return (
    <Button variant="destructive" size="sm" onClick={handleDelete}>
      Eliminar
    </Button>
  );
}