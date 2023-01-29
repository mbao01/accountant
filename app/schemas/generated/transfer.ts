import * as z from "zod"
import * as imports from "../../../prisma/null"
import { CompleteRecord, RelatedRecordObjectSchema, CompleteAccount, RelatedAccountObjectSchema } from "./index"

export const TransferObjectSchema = z.object({
  id: z.string(),
  exchangeRate: z.number(),
  receivedAmount: z.number(),
  createdAt: z.date().nullish(),
  updatedAt: z.date().nullish(),
  recordId: z.string().cuid(),
  senderId: z.string().cuid(),
  recipientId: z.string().cuid(),
})

export interface CompleteTransfer extends z.infer<typeof TransferObjectSchema> {
  Record: CompleteRecord
  Sender: CompleteAccount
  Recipient: CompleteAccount
}

/**
 * RelatedTransferObjectSchema contains all relations on your model in addition to the scalars
 *
 * NOTE: Lazy required in case of potential circular dependencies within schema
 */
export const RelatedTransferObjectSchema: z.ZodSchema<CompleteTransfer> = z.lazy(() => TransferObjectSchema.extend({
  Record: RelatedRecordObjectSchema,
  Sender: RelatedAccountObjectSchema,
  Recipient: RelatedAccountObjectSchema,
}))
