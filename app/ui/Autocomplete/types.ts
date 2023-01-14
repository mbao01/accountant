import type { FocusEventHandler, ReactNode } from "react";
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
  onBlur?: FocusEventHandler<HTMLUListElement>;
};
