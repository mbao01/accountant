import { prisma } from "~/db.server";
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
    },
  });
};

export const createRecord = async (request: Request, data: CreateRecord) => {
  const userId = await requireUserId(request);
  return prisma.record.create({ data: { ...data, createdBy: userId } });
};

export const getRecordTypes = () => {
  return prisma.recordType.findMany();
};

export const createRecordType = (data: CreateRecordType) => {
  return prisma.recordType.create({ data });
};

export const getRecordCategories = () => {
  return prisma.recordCategory.findMany();
};

export const createRecordCategory = (data: CreateRecordCategory) => {
  return prisma.recordCategory.create({ data });
};
