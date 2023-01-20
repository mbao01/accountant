import type { ReactNode } from "react";
import type { TSize, TVariant } from "../types";

export type ButtonProps = {
  size?: TSize;
  type?: "button" | "submit";
  variant?: TVariant;
  outline?: boolean;
  disabled?: boolean;
  children: ReactNode;
  onClick?: () => void;
};
