import * as z from "zod"
import * as imports from "../../../prisma/null"
import { TagPattern } from "@prisma/client"
import { CompleteCurrency, RelatedCurrencyObjectSchema, CompleteRecord, RelatedRecordObjectSchema, CompleteRecordType, RelatedRecordTypeObjectSchema, CompleteTransfer, RelatedTransferObjectSchema, CompleteUser, RelatedUserObjectSchema } from "./index"

export const AccountObjectSchema = z.object({
  id: z.string(),
  name: z.string().min(3),
  number: z.string().min(3),
  sortCode: z.string().nullish(),
  currencyId: z.string().length(3),
  startingBalance: z.preprocess((a) => parseFloat(String((z.string().safeParse(a) as any).data).replaceAll(/[^\d.]/gi, '')), z.number().positive()) as unknown as z.ZodNumber,
  bankName: z.string().min(3),
  bankAddress: z.string().nullish(),
  bankCountry: z.string().min(3),
  tag: z.nativeEnum(TagPattern).nullish(),
  createdAt: z.date().nullish(),
  updatedAt: z.date().nullish(),
  userId: z.string().cuid(),
})

export interface CompleteAccount extends z.infer<typeof AccountObjectSchema> {
  Currency: CompleteCurrency
  Record: CompleteRecord[]
  RecordType: CompleteRecordType[]
  Debit: CompleteTransfer[]
  Credit: CompleteTransfer[]
  User: CompleteUser
}

/**
 * RelatedAccountObjectSchema contains all relations on your model in addition to the scalars
 *
 * NOTE: Lazy required in case of potential circular dependencies within schema
 */
export const RelatedAccountObjectSchema: z.ZodSchema<CompleteAccount> = z.lazy(() => AccountObjectSchema.extend({
  Currency: RelatedCurrencyObjectSchema,
  Record: RelatedRecordObjectSchema.array(),
  RecordType: RelatedRecordTypeObjectSchema.array(),
  Debit: RelatedTransferObjectSchema.array(),
  Credit: RelatedTransferObjectSchema.array(),
  User: RelatedUserObjectSchema,
}))
