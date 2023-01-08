import type { TSize } from "../types";

export const textareaClass =
  "max-h-48 min-h-12 bg-gray-100 rounded-md text-gray-900 placeholder:text-gray-300 focus:placeholder:text-gray-600 focus:outline-none focus:ring-1";

export const labelClass = {
  lg: "text-sm",
  md: "text-sm",
  sm: "text-xs",
} satisfies Record<TSize, string>;

export const textareaWrapperClass = "flex flex-col gap-1 relative";

export const infoClass = "absolute -bottom-6";

export const infoTypeClass = {
  hint: "text-sm text-blue-500",
  error: "text-sm text-red-500",
};

export const sizes = {
  lg: "text-md p-3",
  md: "text-sm p-2.5",
  sm: "text-xs p-2",
} satisfies Record<TSize, string>;

export const disabledClass = 'cursor-not-allowed text-gray-300';

export const errorClasses = {
  text: 'text-red-500',
  border: "ring-1 ring-red-400",
}
