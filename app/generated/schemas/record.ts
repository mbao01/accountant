import * as z from "zod"
import * as imports from "../../../prisma/null"
import { CurrencyCode } from "@prisma/client"
import { CompleteRecordType, RelatedRecordTypeObjectSchema, CompleteRecordCategory, RelatedRecordCategoryObjectSchema, CompleteAccount, RelatedAccountObjectSchema } from "./index"

export const RecordObjectSchema = z.object({
  id: z.string(),
  amount: z.number().int(),
  currency: z.nativeEnum(CurrencyCode),
  note: z.string().nullish(),
  createdAt: z.date().nullish(),
  updatedAt: z.date().nullish(),
  recordTypeId: z.string(),
  recordCategoryId: z.string(),
  accountId: z.string(),
})

export interface CompleteRecord extends z.infer<typeof RecordObjectSchema> {
  type: CompleteRecordType
  category: CompleteRecordCategory
  account: CompleteAccount
}

/**
 * RelatedRecordObjectSchema contains all relations on your model in addition to the scalars
 *
 * NOTE: Lazy required in case of potential circular dependencies within schema
 */
export const RelatedRecordObjectSchema: z.ZodSchema<CompleteRecord> = z.lazy(() => RecordObjectSchema.extend({
  type: RelatedRecordTypeObjectSchema,
  category: RelatedRecordCategoryObjectSchema,
  account: RelatedAccountObjectSchema,
}))
