import { CurrencyCode } from "@prisma/client";

export const CURRENCY_MAP = {
  [CurrencyCode.NGN]: "₦",
  [CurrencyCode.USD]: "$",
  [CurrencyCode.GBP]: "£",
  [CurrencyCode.EUR]: "€",
  [CurrencyCode.RUB]: "₽",
  [CurrencyCode.CNY]: "¥",
} as const;

export const CURRENCY_OPTIONS = [
  { value: CurrencyCode.NGN, label: CURRENCY_MAP[CurrencyCode.NGN] },
  { value: CurrencyCode.USD, label: CURRENCY_MAP[CurrencyCode.USD] },
  { value: CurrencyCode.GBP, label: CURRENCY_MAP[CurrencyCode.GBP] },
  { value: CurrencyCode.EUR, label: CURRENCY_MAP[CurrencyCode.EUR] },
  { value: CurrencyCode.RUB, label: CURRENCY_MAP[CurrencyCode.RUB] },
  { value: CurrencyCode.CNY, label: CURRENCY_MAP[CurrencyCode.CNY] },
] as const;
