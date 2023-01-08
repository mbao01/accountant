import type { TVariant } from "../types";

export const variants = {
  primary: "text-purple-500 hover:text-purple-700",
  secondary: "text-blue-500 hover:text-blue-700",
  danger: "text-red-500 hover:text-red-700",
  success: "text-green-500 hover:text-green-700",
  warning: "text-yellow-500 hover:text-yellow-700",
} satisfies Record<TVariant, string>;

export const linkClass = 'cursor-pointer transition';
