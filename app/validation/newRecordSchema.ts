import { z } from "zod";

export const NewRecordSchema = z.object({
  account: z.string(),
  type: z.string(),
  category: z.string(),
  amount: z.string(),
  note: z.string(),
});
