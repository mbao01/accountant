import * as z from "zod"
import * as imports from "../../../prisma/null"
import { CurrencyCode } from "@prisma/client"
import { CompleteRecordType, RelatedRecordTypeObjectSchema, CompleteRecordCategory, RelatedRecordCategoryObjectSchema, CompleteAccount, RelatedAccountObjectSchema } from "./index"

export const RecordObjectSchema = z.object({
  id: z.string(),
  amount: z.coerce.number(),
  currencyCode: z.nativeEnum(CurrencyCode),
  note: z.string().nullish(),
  createdAt: z.date().nullish(),
  updatedAt: z.date().nullish(),
  recordTypeId: z.string().cuid(),
  recordCategoryId: z.string().cuid(),
  accountId: z.string().cuid(),
})

export interface CompleteRecord extends z.infer<typeof RecordObjectSchema> {
  Type: CompleteRecordType
  Category: CompleteRecordCategory
  Account: CompleteAccount
}

/**
 * RelatedRecordObjectSchema contains all relations on your model in addition to the scalars
 *
 * NOTE: Lazy required in case of potential circular dependencies within schema
 */
export const RelatedRecordObjectSchema: z.ZodSchema<CompleteRecord> = z.lazy(() => RecordObjectSchema.extend({
  Type: RelatedRecordTypeObjectSchema,
  Category: RelatedRecordCategoryObjectSchema,
  Account: RelatedAccountObjectSchema,
}))
