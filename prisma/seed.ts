import { PrismaClient } from "@prisma/client";
import seedCurrency from "./seed/currencies";
import seedUser from "./seed/user";

const prisma = new PrismaClient();

async function seed() {
  await seedUser(prisma);
  await seedCurrency(prisma);

  console.log(`Database has been seeded. 🌱`);
}

seed()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
