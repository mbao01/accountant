import type { FocusEventHandler, ReactNode } from "react";
import type { TSize } from "../types";

export type InputProps = Partial<Pick<HTMLInputElement, "step">> & {
  name: string;
  type?: "text" | "email" | "hidden" | "number" | "password";
  size?: TSize;
  hint?: string;
  error?: string;
  label?: ReactNode;
  disabled?: boolean;
  required?: boolean;
  autoFocus?: boolean;
  className?: string;
  isInvalid?: boolean;
  placeholder?: string;
  onBlur?: FocusEventHandler<HTMLInputElement>;
};
