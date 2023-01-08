import type { ElementType, ReactNode } from "react";
import type { TSize, TVariant } from "../types";

export type LinkProps<T = ElementType> = {
  as?: T;
  size?: TSize;
  variant?: TVariant;
  children: ReactNode;
  underline?: boolean;
  className?: string;
} & React.HTMLProps<T>;
