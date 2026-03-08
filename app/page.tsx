import { prisma } from "@/lib/prisma";
import { ProductCard } from "@/components/product-card";
import { SearchFilters } from "@/components/search-filters";

type Props = {
  searchParams: Promise<{
    search?: string;
    categoryId?: string;
  }>;
};

export default async function Home({ searchParams }: Props) {
  const { search, categoryId } = await searchParams;

  const [products, categories] = await Promise.all([
    prisma.product.findMany({
      where: {
        AND: [
          search ? { name: { contains: search, mode: "insensitive" } } : {},
          categoryId ? { categoryId } : {},
        ],
      },
      orderBy: { createdAt: "desc" },
    }),
    prisma.category.findMany({ orderBy: { name: "asc" } }),
  ]);

  return (
    <main className="max-w-6xl mx-auto px-6 py-10">
      <h1 className="text-3xl font-bold mb-6">Catálogo</h1>
      <SearchFilters categories={categories} />
      {products.length === 0 ? (
        <p className="text-zinc-500 mt-10 text-center">No se encontraron productos.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mt-6">
          {products.map((product) => (
            <ProductCard
              key={product.id}
              id={product.id}
              name={product.name}
              price={Number(product.price)}
              stock={product.stock}
              image={product.image}
            />
          ))}
        </div>
      )}
    </main>
  );
}