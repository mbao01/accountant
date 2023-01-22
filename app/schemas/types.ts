import type {
  CreateRecordObjectSchema,
  CreateRecordCategoryObjectSchema,
  CreateRecordTypeObjectSchema,
} from "~/schemas/record.schema";
import type { z } from "zod";

export type CreateRecordType = z.infer<typeof CreateRecordTypeObjectSchema>;

export type CreateRecordCategory = z.infer<
  typeof CreateRecordCategoryObjectSchema
>;

export type CreateRecord = z.infer<typeof CreateRecordObjectSchema>;
