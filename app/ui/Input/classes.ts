import type { InputProps } from "./types";

export const inputClasses =
  "bg-gray-100 rounded-md text-gray-900 placeholder:text-gray-300 focus:placeholder:text-gray-600";

export const labelClasses = {
  lg: "text-sm",
  md: "text-sm",
  sm: "text-xs",
} satisfies Record<NonNullable<InputProps['size']>, string>;

export const inputWrapperClasses = "flex flex-col gap-1 relative";

export const infoClasses = {
  hint: "text-sm text-blue-500",
  error: "text-sm text-red-500",
};

export const sizes = {
  lg: "text-md px-3 h-12",
  md: "text-sm px-2.5 h-10",
  sm: "text-xs px-2 h-8",
} satisfies Record<NonNullable<InputProps['size']>, string>;

export const disabledClasses = 'cursor-not-allowed text-gray-300';
