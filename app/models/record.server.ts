import type { Prisma } from "@prisma/client";
import { prisma } from "~/db.server";
import { TRANSFER_RECORD } from "~/helpers/api";
import type {
  CreateRecord,
  CreateRecordType,
  CreateRecordCategory,
} from "~/schemas/types";
import { requireUserId } from "~/session.server";

export type { User } from "@prisma/client";

export const getRecords = () => {
  return prisma.record.findMany({
    select: {
      id: true,
      note: true,
      amount: true,
      createdAt: true,
      currencyCode: true,
      Account: { select: { name: true } },
      Category: { select: { name: true } },
      Type: { select: { name: true } },
      User: { select: { firstname: true } },
      Transfer: {
        select: {
          Sender: { select: { id: true, name: true } },
          Recipient: { select: { id: true, name: true } },
        },
      },
    },
  });
};

export const createRecord = async (request: Request, data: CreateRecord) => {
  const userId = await requireUserId(request);
  return prisma.record.create({ data: { ...data, createdBy: userId } });
};

export const getRecordType = (
  where?: Prisma.RecordTypeWhereInput,
  select?: Prisma.RecordTypeSelect
) => {
  return prisma.recordType.findFirst({
    where: { ...where },
    select: {
      id: true,
      name: true,
      tag: true,
      description: true,
      createdAt: true,
      ...select,
    },
  });
};

export const getRecordTypes = (select?: Prisma.RecordTypeSelect) => {
  return prisma.recordType.findMany({
    where: { hidden: false },
    select: {
      id: true,
      name: true,
      tag: true,
      description: true,
      createdAt: true,
      ...select,
    },
  });
};

export const getTransferRecordType = async () => {
  const transferType = await prisma.recordType.findUnique({
    where: { name: TRANSFER_RECORD.name },
    include: {
      RecordCategory: true,
    },
  });
  if (!transferType) {
    return await prisma.recordType.create({
      data: {
        hidden: true,
        name: TRANSFER_RECORD.name,
        description: "",
        tag: "SMALT",
        RecordCategory: {
          create: {
            hidden: true,
            name: TRANSFER_RECORD.name,
            description: "",
          },
        },
      },
      include: {
        RecordCategory: true,
      },
    });
  }
  return transferType;
};

export const getCreditTransfers = (recipientId: string) => {
  return prisma.transfer.findMany({
    where: { recipientId },
    select: {
      id: true,
      exchangeRate: true,
      receivedAmount: true,
      Sender: {
        select: {
          name: true,
          number: true,
          Currency: {
            select: { code: true },
          },
        },
      },
      Recipient: {
        select: {
          name: true,
          number: true,
          Currency: {
            select: { code: true },
          },
        },
      },
      Record: {
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
      },
    },
  });
};

export const getDebitTransfers = (senderId: string) => {
  return prisma.transfer.findMany({
    where: { senderId },
    select: {
      id: true,
      exchangeRate: true,
      receivedAmount: true,
      Sender: {
        select: {
          name: true,
          number: true,
          Currency: {
            select: { code: true },
          },
        },
      },
      Recipient: {
        select: {
          name: true,
          number: true,
          Currency: {
            select: { code: true },
          },
        },
      },
      Record: {
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
      },
    },
  });
};

export const createRecordType = (data: CreateRecordType) => {
  return prisma.recordType.create({ data });
};

export const getRecordCategories = (select?: Prisma.RecordCategorySelect) => {
  return prisma.recordCategory.findMany({
    where: { hidden: false },
    select: {
      id: true,
      name: true,
      description: true,
      createdAt: true,
      recordTypeId: true,
      ...select,
    },
  });
};

export const createRecordCategory = (data: CreateRecordCategory) => {
  return prisma.recordCategory.create({ data });
};
