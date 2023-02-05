import type { CurrencyCode, RecordType } from "@prisma/client";
import type { CreateAccount } from "~/schemas/types";
import { prisma } from "~/db.server";
import {
  createRecord,
  getTransferRecordType,
  getCreditTransfers,
  getDebitTransfers,
} from "~/models/record.server";
import { requireUserId } from "~/session.server";
import { aggregateFunc, groupBy } from "~/helpers/utils";
import { getRecordTypes } from "./record.server";
import invariant from "tiny-invariant";
import { TRANSFER_RECORD } from "~/helpers/api";
import { getTime } from "date-fns";
import { formatCurrency } from "~/helpers/currency";

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
    where: {
      accountId,
      Type: {
        NOT: {
          name: TRANSFER_RECORD.name,
        },
      },
    },
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
      if (recordType) {
        acc[key] = {
          recordType,
          ...aggregateFunc(items, (item) => item.amount),
        };
      }
      return acc;
    },
    {} as Record<
      string,
      ReturnType<typeof aggregateFunc> & { recordType: RecordType }
    >
  );

  const creditTransfers = await getCreditTransfers(account.id);
  const totalCredit = creditTransfers.reduce(
    (total, transfer) => total + transfer?.receivedAmount,
    0
  );
  const creditRecords = creditTransfers.map((transfer) => {
    transfer.Record.currencyCode = transfer.Recipient.Currency.code;
    transfer.Record.Category.name = "Credit";
    const senderName = transfer.Sender.name;
    const amountReceived = formatCurrency(
      transfer.receivedAmount,
      transfer.Sender.Currency.code
    );
    transfer.Record.note = `From: ${senderName} <br /> Amount: ${amountReceived} <br /> ${
      transfer.Record.note ?? ""
    }`;
    return transfer.Record;
  });

  const debitTransfers = await getDebitTransfers(account.id);
  const totalDebit = debitTransfers.reduce(
    (total, transfer) => total + transfer?.Record.amount,
    0
  );
  const debitRecords = debitTransfers.map((transfer) => {
    transfer.Record.currencyCode = transfer.Sender.Currency.code;
    transfer.Record.Category.name = "Debit";
    const recipientName = transfer.Recipient.name;
    const amountSent = formatCurrency(
      transfer.receivedAmount,
      transfer.Recipient.Currency.code
    );
    transfer.Record.note = `To: ${recipientName} <br /> Amount: ${amountSent} <br /> ${
      transfer.Record.note ?? ""
    }`;
    return transfer.Record;
  });

  const allRecords = [...records, ...creditRecords, ...debitRecords].sort(
    (a, b) => getTime(new Date(b.createdAt!)) - getTime(new Date(a.createdAt!))
  );

  const balance =
    Number(account.startingBalance) +
    Number(totalCredit) -
    Number(totalDebit) +
    Number(aggregate["Income"]?.$sum ?? "") -
    Number(aggregate["Expense"]?.$sum ?? "");

  return {
    account,
    balance,
    records: allRecords,
    aggregate,
    debits: { amount: totalDebit, count: debitTransfers.length },
    credits: { amount: totalCredit, count: creditTransfers.length },
  };
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

export const makeAccountTransfer = async (
  request: Request,
  data: {
    note?: string | null | undefined;
    currencyCode: CurrencyCode;
    amount: number;
    senderId: string;
    recipientId: string;
    exchangeRate?: number;
  }
) => {
  const {
    senderId,
    recipientId,
    amount,
    exchangeRate = 1,
    currencyCode,
    note,
  } = data;
  const sender = await getAccount(senderId);
  const recipient = await getAccount(recipientId);
  const transferType = await getTransferRecordType();

  invariant(sender?.id, `sender with ID ${senderId} does not exist`);
  invariant(recipient?.id, `recipient with ID ${recipientId} does not exist`);
  invariant(
    transferType?.id && transferType.RecordCategory.length > 0,
    `transfer cannot proceed - invalid record type`
  );

  const positiveAmount = Math.abs(amount);
  const positiveExchangeRate = Math.abs(exchangeRate ?? 1);
  const record = await createRecord(request, {
    note,
    amount: positiveAmount,
    accountId: sender.id,
    currencyCode,
    recordTypeId: transferType.id,
    recordCategoryId: transferType.RecordCategory[0].id,
  });

  invariant(record.id, `unable to create transfer record`);

  return prisma.transfer.create({
    data: {
      recordId: record.id,
      senderId: sender.id,
      recipientId: recipient.id,
      exchangeRate: positiveExchangeRate,
      receivedAmount: positiveAmount * positiveExchangeRate,
    },
  });
};
