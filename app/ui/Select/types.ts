import type { ReactNode } from "react";
import type { TSize } from "../types";

export type TOption = {
  id?: string;
  label: string;
  type?: string;
  value?: string;
  disabled?: boolean;
  className?: string;
};

export type SelectProps = {
  name?: string;
  size?: TSize;
  options: TOption[];
  label?: ReactNode;
  outline?: boolean;
  disabled?: boolean;
  required?: boolean;
  isInvalid?: boolean;
  className?: string;
};
