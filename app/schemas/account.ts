import { AccountObjectSchema } from "~/generated/schemas";

export const CreateAccountObjectSchema = AccountObjectSchema.omit({
  id: true,
  userId: true,
  createdAt: true,
  updatedAt: true,
});
