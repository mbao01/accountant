import type { ReactNode } from "react";
import type { TValidator } from "~/hooks/useForm/types";
import type { TSize } from "../types";

export type TOption = {
  id?: string;
  label: string;
  type?: string;
  value?: string;
  disabled?: boolean;
  className?: string;
};

export type AutocompleteProps = {
  name?: string;
  size?: TSize;
  label?: ReactNode;
  options: TOption[];
  outline?: boolean;
  disabled?: boolean;
  required?: boolean;
  isInvalid?: boolean;
  onValidate?: TValidator;
};
