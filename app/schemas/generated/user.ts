import * as z from "zod"
import * as imports from "../../../prisma/null"
import { Role } from "@prisma/client"
import { CompleteAccount, RelatedAccountObjectSchema, CompleteRecord, RelatedRecordObjectSchema, CompletePassword, RelatedPasswordObjectSchema } from "./index"

export const UserObjectSchema = z.object({
  id: z.string(),
  email: z.string().email(),
  firstname: z.string().min(3),
  createdAt: z.date(),
  updatedAt: z.date(),
  role: z.nativeEnum(Role),
})

export interface CompleteUser extends z.infer<typeof UserObjectSchema> {
  Account: CompleteAccount[]
  Record: CompleteRecord[]
  Password?: CompletePassword | null
}

/**
 * RelatedUserObjectSchema contains all relations on your model in addition to the scalars
 *
 * NOTE: Lazy required in case of potential circular dependencies within schema
 */
export const RelatedUserObjectSchema: z.ZodSchema<CompleteUser> = z.lazy(() => UserObjectSchema.extend({
  Account: RelatedAccountObjectSchema.array(),
  Record: RelatedRecordObjectSchema.array(),
  Password: RelatedPasswordObjectSchema.nullish(),
}))
