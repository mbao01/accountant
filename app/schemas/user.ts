import { UserObjectSchema } from "~/generated/schemas";

export const CreateUserObjectSchema = UserObjectSchema.omit({
  id: true,
  createdAt: true,
  updatedAt: true,
});
