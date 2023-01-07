import type { ReactNode } from "react";

export type ButtonProps = {
  size?: "lg" | "md" | "sm";
  type?: "button" | "submit";
  variant?: "primary" | "secondary" | "danger" | "success" | "warning";
  outline?: boolean;
  disabled?: boolean;
  children: ReactNode;
};
