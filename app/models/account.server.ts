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

export const getAccountAnalytics = async (accountId: string) => {
  const records = await prisma.record.groupBy({
    by: ["recordTypeId"],
    where: { accountId },
    _avg: { amount: true },
    _max: { amount: true },
    _min: { amount: true },
    _sum: { amount: true },
  });

  const recordTypes = await prisma.recordType.findMany({
    where: {
      OR: records.map(({ recordTypeId }) => ({
        id: recordTypeId,
      })),
    },
    select: {
      id: true,
      tag: true,
      name: true,
    },
  });

  const groups = recordTypes.reduce((acc, recordType) => {
    acc[recordType.name.toLowerCase()] = {
      recordType,
      ...records.find(({ recordTypeId }) => recordTypeId === recordType.id),
    };
    return acc;
  }, {} as any);

  const accountBalance =
    Number(groups["income"]?._sum.amount ?? "") -
    Number(groups["expense"]?._sum.amount ?? "");

  return { groups, accountBalance };
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
