import { type PrismaClient, Role } from "@prisma/client";
import bcrypt from "bcryptjs";

export default async function seedUser(prisma: PrismaClient) {
  const email = "hey@accountant.io";

  // cleanup the existing database
  await prisma.user.delete({ where: { email } }).catch(() => {
    // no worries if it doesn't exist yet
  });

  const hashedPassword = await bcrypt.hash("ayoiscool", 10);

  await prisma.user.create({
    data: {
      email,
      firstname: "Ayomide",
      role: Role.OWNER,
      Password: {
        create: {
          hash: hashedPassword,
        },
      },
    },
  });

  await prisma.user.findMany({
    include: {
      Account: true,
    },
  });

  console.log(`- Users has been seeded. 🌱`);
}
