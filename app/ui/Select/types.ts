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
  outline?: boolean;
  disabled?: boolean;
  options: TOption[];
  className?: string;
};
