import { RecordCategoryObjectSchema } from "~/generated/schemas";

export const CreateRecordCategoryObjectSchema = RecordCategoryObjectSchema.omit(
  {
    id: true,
    createdAt: true,
    updatedAt: true,
  }
);
