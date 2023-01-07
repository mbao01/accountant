import type { TSize } from "../types";

type TOptionObject = {
  label: string;
  type?: string;
  value?: string;
  disabled?: boolean;
  className?: string;
};

export type TOption = TOptionObject;

export type SelectProps = {
  size?: TSize;
  outline?: boolean;
  disabled?: boolean;
  options: TOption[];
};
