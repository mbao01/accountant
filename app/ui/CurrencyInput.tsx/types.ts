import type { CurrencyCode } from "@prisma/client";
import type { TFieldValidation } from "~/hooks/useFormValidator/types";
import type { InputProps } from "../Input/types";

export type CurrencyInputProps = Omit<InputProps, "type" | "step"> & {
  code?: CurrencyCode;
  currencyProps?: TFieldValidation<any>;
};
