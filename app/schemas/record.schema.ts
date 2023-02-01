import {
  RecordObjectSchema,
  RecordTypeObjectSchema,
  RecordCategoryObjectSchema,
  TransferObjectSchema,
} from "./generated";

export const CreateRecordObjectSchema = RecordObjectSchema.omit({
  id: true,
  createdAt: true,
  createdBy: true,
  updatedAt: true,
});

export const CreateRecordTypeObjectSchema = RecordTypeObjectSchema.omit({
  id: true,
  createdAt: true,
  updatedAt: true,
});

export const CreateRecordCategoryObjectSchema = RecordCategoryObjectSchema.omit(
  {
    id: true,
    createdAt: true,
    updatedAt: true,
  }
);

export const CreateTransferObjectSchema = TransferObjectSchema.merge(
  RecordObjectSchema
).omit({
  id: true,
  recordId: true,
  accountId: true,
  createdBy: true,
  createdAt: true,
  updatedAt: true,
  recordTypeId: true,
  receivedAmount: true,
  exchangeRate: true,
  recordCategoryId: true,
});
