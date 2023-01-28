import type { CurrencyCode } from "@prisma/client";

export type AddRecordProps = {
  account?: {
    id: string;
    name: string;
    number: string;
    Currency: { code: CurrencyCode };
  };
};
