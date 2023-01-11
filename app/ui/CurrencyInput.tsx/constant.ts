import { CurrencyCode } from "@prisma/client";

export const CURRENCY_OPTIONS = [
  { label: "₦", value: CurrencyCode.NGN },
  { label: "$", value: CurrencyCode.USD },
  { label: "£", value: CurrencyCode.GBP },
  { label: "€", value: CurrencyCode.EUR },
  { label: "₽", value: CurrencyCode.RUB },
  { label: "¥", value: CurrencyCode.CNY },
];
