import type { CurrencyCode, RecordType } from "@prisma/client";
import type { CreateAccount } from "~/schemas/types";
import { prisma } from "~/db.server";
import { requireUserId } from "~/session.server";
import { aggregateFunc, groupBy } from "~/helpers/utils";
import { getRecordTypes } from "./record.server";

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

export const getAccountRecords = (accountId: string) => {
  return prisma.record.findMany({
    where: { accountId },
    select: {
      id: true,
      note: true,
      amount: true,
      createdAt: true,
      currencyCode: true,
      Category: { select: { name: true } },
      Type: { select: { name: true } },
      User: { select: { firstname: true } },
    },
  });
};

export const getAccountAnalytics = async (accountId: string) => {
  const account = await getAccount(accountId);
  const recordTypes = await getRecordTypes();
  const records = await getAccountRecords(accountId);
  const groupedRecords = groupBy(records, (r) => r.Type.name);
  const aggregate = Object.entries<typeof records>(groupedRecords).reduce(
    (acc, [key, items]) => {
      const recordType = recordTypes.find(
        ({ name }) => name === key
      ) as RecordType;
      acc[key] = { recordType, ...aggregateFunc(items, (item) => item.amount) };
      return acc;
    },
    {} as Record<
      string,
      ReturnType<typeof aggregateFunc> & { recordType: RecordType }
    >
  );

  const balance =
    Number(account.startingBalance) +
    Number(aggregate["Income"]?.$sum ?? "") -
    Number(aggregate["Expense"]?.$sum ?? "");

  return { account, records, balance, aggregate };
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
