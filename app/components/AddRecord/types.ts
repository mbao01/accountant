import type { Account, Currency } from "@prisma/client";

export type AddRecordProps = {
  account?: Account & { Currency: Currency };
};
