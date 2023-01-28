import type { ReactNode } from "react";
import type { TSize, TVariant } from "../types";

export type ButtonProps = {
  size?: TSize;
  type?: "button" | "submit";
  variant?: TVariant;
  loading?: boolean;
  outline?: boolean;
  disabled?: boolean;
  children: ReactNode;
  onClick?: () => void;
  className?: string;
};
