import type { CurrencyCode } from "@prisma/client";

export type AccountTransferProps = {
  fromAccount: {
    id: string;
    name: string;
    number: string;
    Currency: { code: CurrencyCode };
  };
};
