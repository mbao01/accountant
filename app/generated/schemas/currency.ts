import * as z from "zod"
import * as imports from "../../../prisma/null"
import { CurrencyCode, CurrencySign } from "@prisma/client"
import { CompleteAccount, RelatedAccountObjectSchema } from "./index"

export const CurrencyObjectSchema = z.object({
  id: z.string(),
  code: z.nativeEnum(CurrencyCode),
  sign: z.nativeEnum(CurrencySign),
  createdAt: z.date().nullish(),
  updatedAt: z.date().nullish(),
})

export interface CompleteCurrency extends z.infer<typeof CurrencyObjectSchema> {
  Account: CompleteAccount[]
}

/**
 * RelatedCurrencyObjectSchema contains all relations on your model in addition to the scalars
 *
 * NOTE: Lazy required in case of potential circular dependencies within schema
 */
export const RelatedCurrencyObjectSchema: z.ZodSchema<CompleteCurrency> = z.lazy(() => CurrencyObjectSchema.extend({
  Account: RelatedAccountObjectSchema.array(),
}))
