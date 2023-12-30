import { z } from "zod";
import { UserObjectSchema } from "./generated";

export const CreateUserObjectSchema = UserObjectSchema.omit({
  id: true,
  createdAt: true,
  updatedAt: true,
});

export const LoginUserObjectSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8),
});

export const ResetPasswordObjectSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8),
  secret: z.string().min(8),
});
