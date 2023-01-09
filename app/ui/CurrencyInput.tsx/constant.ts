import { CurrencyCode, CurrencySign } from "@prisma/client";

export const currencyOptions = [
  { label: CurrencySign.NGN, value: CurrencyCode.NGN },
  { label: CurrencySign.GBP, value: CurrencyCode.GBP },
  { label: CurrencySign.USD, value: CurrencyCode.USD },
  { label: CurrencySign.EUR, value: CurrencyCode.EUR },
  { label: CurrencySign.CNY, value: CurrencyCode.CNY },
];
