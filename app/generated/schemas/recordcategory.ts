import * as z from "zod"
import * as imports from "../../../prisma/null"
import { CompleteRecordType, RelatedRecordTypeObjectSchema, CompleteRecord, RelatedRecordObjectSchema } from "./index"

export const RecordCategoryObjectSchema = z.object({
  id: z.string(),
  name: z.string(),
  description: z.string(),
  createdAt: z.date().nullish(),
  updatedAt: z.date().nullish(),
  recordTypeId: z.string().nullish(),
})

export interface CompleteRecordCategory extends z.infer<typeof RecordCategoryObjectSchema> {
  RecordType?: CompleteRecordType | null
  Record: CompleteRecord[]
}

/**
 * RelatedRecordCategoryObjectSchema contains all relations on your model in addition to the scalars
 *
 * NOTE: Lazy required in case of potential circular dependencies within schema
 */
export const RelatedRecordCategoryObjectSchema: z.ZodSchema<CompleteRecordCategory> = z.lazy(() => RecordCategoryObjectSchema.extend({
  RecordType: RelatedRecordTypeObjectSchema.nullish(),
  Record: RelatedRecordObjectSchema.array(),
}))
