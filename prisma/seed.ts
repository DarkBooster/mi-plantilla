import "dotenv/config";
import { PrismaClient } from "../lib/generated/prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";

const adapter = new PrismaPg({ connectionString: process.env.PRISMA_DATABASE_URL! });
const prisma = new PrismaClient({ adapter });

async function main() {
  const categories = ["Calzado", "Accesorios", "Ropa", "Bolsos"];

  for (const name of categories) {
    await prisma.category.upsert({
      where: { name },
      update: {},
      create: { name },
    });
  }

  console.log("✅ Categorías creadas");
}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect());