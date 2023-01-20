import * as z from "zod"
import * as imports from "../../../prisma/null"
import { Role } from "@prisma/client"
import { CompleteAccount, RelatedAccountObjectSchema, CompletePassword, RelatedPasswordObjectSchema } from "./index"

export const UserObjectSchema = z.object({
  id: z.string(),
  email: z.string(),
  firstname: z.string(),
  createdAt: z.date(),
  updatedAt: z.date(),
  role: z.nativeEnum(Role),
})

export interface CompleteUser extends z.infer<typeof UserObjectSchema> {
  Account: CompleteAccount[]
  Password?: CompletePassword | null
}

/**
 * RelatedUserObjectSchema contains all relations on your model in addition to the scalars
 *
 * NOTE: Lazy required in case of potential circular dependencies within schema
 */
export const RelatedUserObjectSchema: z.ZodSchema<CompleteUser> = z.lazy(() => UserObjectSchema.extend({
  Account: RelatedAccountObjectSchema.array(),
  Password: RelatedPasswordObjectSchema.nullish(),
}))
