import type { TColor } from "~/ui/types";

export const RECORD_TYPE_BADGE_COLOR = {
  Income: "green",
  Expense: "gray",
  Gift: "yellow",
  Lending: "purple",
  Investment: "blue",
} as Record<string, TColor>;
