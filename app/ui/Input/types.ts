import type { ReactNode } from "react";

export type InputProps = {
  name: string;
  size?: "lg" | "md" | "sm";
  hint?: string;
  error?: string;
  label?: ReactNode;
  disabled?: boolean;
  required?: boolean;
  placeholder?: string;
};
