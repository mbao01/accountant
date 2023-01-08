import type { TSize } from "../types";

export const inputClass =
  "bg-gray-100 rounded-md text-gray-900 placeholder:text-gray-300 focus:placeholder:text-gray-600";

export const labelClass = {
  lg: "text-sm",
  md: "text-sm",
  sm: "text-xs",
} satisfies Record<TSize, string>;

export const inputWrapperClass = "flex flex-col gap-1 relative";

export const infoClass = "absolute -bottom-6";

export const infoTypeClass = {
  hint: "text-sm text-blue-500",
  error: "text-sm text-red-500",
};

export const sizes = {
  lg: "text-md px-3 h-12",
  md: "text-sm px-2.5 h-10",
  sm: "text-xs px-2 h-8",
} satisfies Record<TSize, string>;

export const disabledClass = 'cursor-not-allowed text-gray-300';

export const errorClasses = {
  text: 'text-red-500',
  border: "ring-1 ring-red-400",
}
