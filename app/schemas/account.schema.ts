import { AccountObjectSchema } from "./generated";

export const CreateAccountObjectSchema = AccountObjectSchema.omit({
  id: true,
  userId: true,
  createdAt: true,
  updatedAt: true,
});
