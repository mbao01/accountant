import type { ReactNode } from "react";
import type { TSize } from "../types";

export type InputProps = {
  name: string;
  size?: TSize;
  hint?: string;
  error?: string;
  label?: ReactNode;
  disabled?: boolean;
  required?: boolean;
  placeholder?: string;
};
