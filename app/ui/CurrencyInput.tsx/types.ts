import type { InputProps } from "../Input/types";

export type CurrencyInputProps = Omit<InputProps, "type" | "step"> & {
  currencyCode: CurrencyCode;
};

export enum CurrencyCode {
  NGN = "NGN",
  GBP = "GBP",
  USD = "USD",
  EUR = "EUR",
  CNY = "CNY",
}

export enum CurrencySign {
  NGN = "₦",
  GBP = "£",
  USD = "$",
  EUR = "€",
  CNY = "¥",
}
