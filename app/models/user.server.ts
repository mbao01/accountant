import type { Password, User } from "@prisma/client";
import bcrypt from "bcryptjs";

import { prisma } from "~/db.server";

export type { User } from "@prisma/client";

export async function getUserById(id: User["id"]) {
  return prisma.user.findUnique({ where: { id } });
}

export async function getUserByEmail(email: User["email"]) {
  return prisma.user.findUnique({ where: { email } });
}

export async function createUser(
  user: Omit<User, "id" | "createdAt" | "updatedAt">,
  password: string
) {
  const hashedPassword = await bcrypt.hash(password, 10);

  return prisma.user.create({
    data: {
      ...user,
      Password: {
        create: {
          hash: hashedPassword,
        },
      },
    },
  });
}

export async function deleteUserByEmail(email: User["email"]) {
  return prisma.user.delete({ where: { email } });
}

export async function verifyLogin(
  email: User["email"],
  password: Password["hash"]
) {
  const userWithPassword = await prisma.user.findUnique({
    where: { email },
    include: {
      Password: true,
    },
  });

  if (!userWithPassword || !userWithPassword.Password) {
    return null;
  }

  const isValid = await bcrypt.compare(
    password,
    userWithPassword.Password.hash
  );

  if (!isValid) {
    return null;
  }

  const { Password: _password, ...userWithoutPassword } = userWithPassword;

  return userWithoutPassword;
}
