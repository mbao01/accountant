import type { CurrencyCode } from "@prisma/client";

export const formatCurrency = (
  value: number | string,
  format: CurrencyCode = "USD"
) =>
  new Intl.NumberFormat("en", {
    style: "currency",
    currency: format,
    currencyDisplay: "narrowSymbol",
  }).format(Number(value));
