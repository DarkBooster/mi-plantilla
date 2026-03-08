"use client";

import { useRouter } from "next/navigation";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { useState, Suspense } from "react";

type Category = {
  id: string;
  name: string;
};

type Props = {
  categories: Category[];
};

function SearchFiltersInner({ categories }: Props) {
  const router = useRouter();
  const [search, setSearch] = useState("");
  const [categoryId, setCategoryId] = useState("");

  function handleSearch() {
    const params = new URLSearchParams();
    if (search) params.set("search", search);
    if (categoryId) params.set("categoryId", categoryId);
    router.push(`/?${params.toString()}`);
  }

  function handleClear() {
    setSearch("");
    setCategoryId("");
    router.push("/");
  }

  return (
    <div className="flex flex-col sm:flex-row gap-3">
      <Input
        placeholder="Buscar productos..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        onKeyDown={(e) => e.key === "Enter" && handleSearch()}
        className="max-w-sm"
      />
      <select
        value={categoryId}
        onChange={(e) => setCategoryId(e.target.value)}
        className="border rounded-md px-3 py-2 text-sm bg-background"
      >
        <option value="">Todas las categorías</option>
        {categories.map((cat) => (
          <option key={cat.id} value={cat.id}>
            {cat.name}
          </option>
        ))}
      </select>
      <Button onClick={handleSearch}>Buscar</Button>
      <Button variant="outline" onClick={handleClear}>Limpiar</Button>
    </div>
  );
}

export function SearchFilters({ categories }: Props) {
  return (
    <Suspense fallback={<div className="h-10" />}>
      <SearchFiltersInner categories={categories} />
    </Suspense>
  );
}