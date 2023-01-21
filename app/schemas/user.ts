import { z } from "zod";
import { UserObjectSchema } from "~/generated/schemas";

export const CreateUserObjectSchema = UserObjectSchema.omit({
  id: true,
  createdAt: true,
  updatedAt: true,
});

export const LoginUserObjectSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8),
});
