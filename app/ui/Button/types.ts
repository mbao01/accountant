import type { ReactNode } from "react";
import type { TSize } from "../types";

export type ButtonProps = {
  size?: TSize;
  type?: "button" | "submit";
  variant?: "primary" | "secondary" | "danger" | "success" | "warning";
  outline?: boolean;
  disabled?: boolean;
  children: ReactNode;
};
