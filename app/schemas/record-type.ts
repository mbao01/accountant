import { RecordTypeObjectSchema } from "~/generated/schemas";

export const CreateRecordTypeObjectSchema = RecordTypeObjectSchema.omit({
  id: true,
  createdAt: true,
  updatedAt: true,
});
