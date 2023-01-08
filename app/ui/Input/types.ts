import type { ReactNode } from "react";
import type { TSize } from "../types";

export type InputProps = Pick<HTMLInputElement, "step"> & {
  name: string;
  type?: "text" | "hidden" | "number";
  size?: TSize;
  hint?: string;
  error?: string;
  label?: ReactNode;
  disabled?: boolean;
  required?: boolean;
  className?: string;
  isInvalid?: boolean;
  placeholder?: string;
};
