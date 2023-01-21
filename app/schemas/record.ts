import {
  RecordObjectSchema,
  RecordTypeObjectSchema,
  RecordCategoryObjectSchema,
} from "./generated";

export const CreateRecordObjectSchema = RecordObjectSchema.omit({
  id: true,
  createdAt: true,
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
