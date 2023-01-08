import { z } from "zod";

export const NewRecordSchema = z.object({
  account: z.string(),
  type: z.string(),
  category: z.string(),
  amount: z.coerce.number().min(0.001).max(2_147_483_647),
  note: z.string().optional(),
});
