import * as z from "zod"
import * as imports from "../../../prisma/null"
import { CurrencyCode } from "@prisma/client"
import { CompleteRecordType, RelatedRecordTypeObjectSchema, CompleteRecordCategory, RelatedRecordCategoryObjectSchema, CompleteAccount, RelatedAccountObjectSchema, CompleteUser, RelatedUserObjectSchema, CompleteTransfer, RelatedTransferObjectSchema } from "./index"

export const RecordObjectSchema = z.object({
  id: z.string(),
  amount: z.preprocess((a) => parseFloat(String(z.string().parse(a)).replaceAll(/[^\d.]/gi, '')), z.number().positive()) as unknown as z.ZodNumber,
  currencyCode: z.nativeEnum(CurrencyCode),
  note: z.string().nullish(),
  createdAt: z.date().nullish(),
  updatedAt: z.date().nullish(),
  recordTypeId: z.string().cuid(),
  recordCategoryId: z.string().cuid(),
  accountId: z.string().cuid(),
  createdBy: z.string().cuid(),
})

export interface CompleteRecord extends z.infer<typeof RecordObjectSchema> {
  Type: CompleteRecordType
  Category: CompleteRecordCategory
  Account: CompleteAccount
  User: CompleteUser
  Transfer?: CompleteTransfer | null
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
  User: RelatedUserObjectSchema,
  Transfer: RelatedTransferObjectSchema.nullish(),
}))
