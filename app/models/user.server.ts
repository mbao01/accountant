import type { Password, Prisma, User } from "@prisma/client";
import bcrypt from "bcryptjs";

import { prisma } from "~/db.server";

export type { User } from "@prisma/client";

export const getUserCount = () => {
  return prisma.user.count();
};

export const getUsers = (select?: Prisma.UserSelect) => {
  return prisma.user.findMany({
    select: {
      id: true,
      email: true,
      firstname: true,
      createdAt: true,
      role: true,
      ...select,
    },
  });
};

export const getUserById = (id: User["id"]) => {
  return prisma.user.findUnique({ where: { id } });
};

export const getUserByEmail = (email: User["email"]) => {
  return prisma.user.findUnique({ where: { email } });
};

export const createUser = async (
  user: Omit<User, "id" | "createdAt" | "updatedAt">,
  password: string
) => {
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
};

export const resetPassword = async (email: string, password: string) => {
  const hashedPassword = await bcrypt.hash(password, 10);

  return prisma.user.update({
    where: { email },
    data: {
      Password: {
        update: {
          hash: hashedPassword,
        },
      },
    },
  });
};

export const deleteUserByEmail = (email: User["email"]) => {
  return prisma.user.delete({ where: { email } });
};

export const verifyLogin = async (
  email: User["email"],
  password: Password["hash"]
) => {
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
};
