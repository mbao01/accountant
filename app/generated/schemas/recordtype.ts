import * as z from "zod"
import * as imports from "../../../prisma/null"
import { TagColor } from "@prisma/client"
import { CompleteAccount, RelatedAccountObjectSchema, CompleteRecordCategory, RelatedRecordCategoryObjectSchema, CompleteRecord, RelatedRecordObjectSchema } from "./index"

export const RecordTypeObjectSchema = z.object({
  id: z.string(),
  name: z.string(),
  description: z.string(),
  tag: z.nativeEnum(TagColor).nullish(),
  createdAt: z.date().nullish(),
  updatedAt: z.date().nullish(),
})

export interface CompleteRecordType extends z.infer<typeof RecordTypeObjectSchema> {
  Account: CompleteAccount[]
  category: CompleteRecordCategory[]
  Record: CompleteRecord[]
}

/**
 * RelatedRecordTypeObjectSchema contains all relations on your model in addition to the scalars
 *
 * NOTE: Lazy required in case of potential circular dependencies within schema
 */
export const RelatedRecordTypeObjectSchema: z.ZodSchema<CompleteRecordType> = z.lazy(() => RecordTypeObjectSchema.extend({
  Account: RelatedAccountObjectSchema.array(),
  category: RelatedRecordCategoryObjectSchema.array(),
  Record: RelatedRecordObjectSchema.array(),
}))