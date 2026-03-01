import { prisma } from "@/lib/prisma";
import { ProductCard } from "@/components/product-card";

export default async function Home() {
  const products = await prisma.product.findMany();

  return (
    <main className="max-w-6xl mx-auto px-6 py-10">
      <h1 className="text-3xl font-bold mb-8">Catálogo</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {products.map((product) => (
          <ProductCard
            key={product.id}
            id={product.id}
            name={product.name}
            price={Number(product.price)}
            stock={product.stock}
          />
        ))}
      </div>
    </main>
  );
}