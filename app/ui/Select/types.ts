import type { TSize } from "../types";

export type TOption = {
  label: string;
  type?: string;
  value?: string;
  disabled?: boolean;
  className?: string;
};

export type SelectProps = {
  size?: TSize;
  outline?: boolean;
  disabled?: boolean;
  options: TOption[];
};
