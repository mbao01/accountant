import type { ChangeEventHandler, ReactNode } from "react";
import type { TValidator } from "~/hooks/useFormValidator/types";
import type { TSize } from "../types";

export type InputProps = Partial<Pick<HTMLInputElement, "step">> & {
  name: string;
  type?: "text" | "email" | "hidden" | "number" | "password";
  size?: TSize;
  hint?: string;
  error?: string;
  label?: ReactNode;
  value?: string;
  controlledValue?: string;
  disabled?: boolean;
  onChange?: ChangeEventHandler<HTMLInputElement>;
  required?: boolean;
  autoFocus?: boolean;
  className?: string;
  inputMode?:
    | "search"
    | "text"
    | "email"
    | "tel"
    | "url"
    | "none"
    | "numeric"
    | "decimal";
  isInvalid?: boolean;
  placeholder?: string;
  onValidate?: TValidator;
};
