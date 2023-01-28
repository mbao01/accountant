import type { Prisma, User } from "@prisma/client";

export type UserListProps = {
  items: (Omit<User, "createdAt" | "updatedAt" | "email"> & {
    _count?: Prisma.UserCountOutputType;
  })[];
};
