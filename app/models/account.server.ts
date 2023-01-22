import type { CurrencyCode } from "@prisma/client";
import type { CreateAccount } from "~/schemas/types";
import { prisma } from "~/db.server";
import { requireUserId } from "~/session.server";

export const getAccounts = () => {
  return prisma.account.findMany({
    select: {
      id: true,
      tag: true,
      _count: true,
      name: true,
      number: true,
      sortCode: true,
      createdAt: true,
      startingBalance: true,
      Currency: { select: { code: true } },
      User: { select: { firstname: true } },
    },
  });
};

export const getAccount = (accountId: string) => {
  return prisma.account.findUniqueOrThrow({
    where: { id: accountId },
  });
};

export const createAccount = async (request: Request, data: CreateAccount) => {
  const userId = await requireUserId(request);
  // get currencyId
  const currency = await prisma.currency.findFirst({
    where: {
      code: data.currencyId as CurrencyCode,
    },
  });

  return prisma.account.create({
    data: { ...data, userId, currencyId: currency?.id! },
  });
};
