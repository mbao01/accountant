import type { ReactNode } from "react";
import type { TSize } from "../types";

export type TextareaProps = {
  name: string;
  rows?: number;
  size?: TSize;
  hint?: string;
  error?: string;
  label?: ReactNode;
  disabled?: boolean;
  required?: boolean;
  isInvalid?: boolean;
  placeholder?: string;
};
