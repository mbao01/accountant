import * as z from "zod"
import * as imports from "../../../prisma/null"
import { CompleteUser, RelatedUserObjectSchema } from "./index"

export const PasswordObjectSchema = z.object({
  hash: z.string(),
  userId: z.string(),
})

export interface CompletePassword extends z.infer<typeof PasswordObjectSchema> {
  user: CompleteUser
}

/**
 * RelatedPasswordObjectSchema contains all relations on your model in addition to the scalars
 *
 * NOTE: Lazy required in case of potential circular dependencies within schema
 */
export const RelatedPasswordObjectSchema: z.ZodSchema<CompletePassword> = z.lazy(() => PasswordObjectSchema.extend({
  user: RelatedUserObjectSchema,
}))
