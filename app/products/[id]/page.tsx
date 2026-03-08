import { prisma } from "@/lib/prisma";
import { notFound } from "next/navigation";
import Image from "next/image";
import { AddToCartButton } from "@/components/add-to-cart-button";

export default async function ProductPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const product = await prisma.product.findUnique({
    where: { id },
    include: { category: true },
  });

  if (!product) notFound();

  return (
    <main className="max-w-4xl mx-auto px-6 py-10">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
        <div className="relative h-80 w-full rounded-xl overflow-hidden bg-zinc-100 dark:bg-zinc-800">
          {product.image ? (
            <Image src={product.image} alt={product.name} fill className="object-cover" />
          ) : (
            <div className="h-full w-full" />
          )}
        </div>
        <div className="flex flex-col gap-4 justify-center">
          {product.category && (
            <span className="text-sm text-zinc-500 uppercase tracking-wide">
              {product.category.name}
            </span>
          )}
          <h1 className="text-3xl font-bold">{product.name}</h1>
          {product.description && (
            <p className="text-zinc-500">{product.description}</p>
          )}
          <p className="text-zinc-500">Stock disponible: {product.stock}</p>
          <p className="text-4xl font-bold">${Number(product.price).toFixed(2)}</p>
          <AddToCartButton
            id={product.id}
            name={product.name}
            price={Number(product.price)}
          />
        </div>
      </div>
    </main>
  );
}