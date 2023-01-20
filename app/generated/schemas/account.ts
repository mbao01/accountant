import * as z from "zod"
import * as imports from "../../../prisma/null"
import { TagPattern } from "@prisma/client"
import { CompleteCurrency, RelatedCurrencyObjectSchema, CompleteRecord, RelatedRecordObjectSchema, CompleteRecordType, RelatedRecordTypeObjectSchema, CompleteUser, RelatedUserObjectSchema } from "./index"

export const AccountObjectSchema = z.object({
  id: z.string(),
  name: z.string().min(3),
  number: z.string().min(3),
  sortCode: z.string().nullish(),
  currencyId: z.string(),
  startingBalance: z.coerce.number(),
  bankName: z.string().min(3),
  bankAddress: z.string().nullish(),
  bankCountry: z.string().min(3),
  tag: z.nativeEnum(TagPattern).nullish(),
  createdAt: z.date().nullish(),
  updatedAt: z.date().nullish(),
  userId: z.string(),
})

export interface CompleteAccount extends z.infer<typeof AccountObjectSchema> {
  currency: CompleteCurrency
  Record: CompleteRecord[]
  RecordType: CompleteRecordType[]
  user: CompleteUser
}

/**
 * RelatedAccountObjectSchema contains all relations on your model in addition to the scalars
 *
 * NOTE: Lazy required in case of potential circular dependencies within schema
 */
export const RelatedAccountObjectSchema: z.ZodSchema<CompleteAccount> = z.lazy(() => AccountObjectSchema.extend({
  currency: RelatedCurrencyObjectSchema,
  Record: RelatedRecordObjectSchema.array(),
  RecordType: RelatedRecordTypeObjectSchema.array(),
  user: RelatedUserObjectSchema,
}))
