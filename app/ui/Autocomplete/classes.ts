import type { TSize } from "./../types";

export const sizes = {
  lg: "rounded-md px-3 py-3 text-md h-12",
  md: "rounded-md px-2.5 py-2 text-sm h-10",
  sm: "rounded-md px-2 py-2 text-xs h-8",
} satisfies Record<TSize, string>;

export const disabledClass = {
  solid: "bg-gray-100 text-gray-500 pointer-events-none cursor-not-allowed",
  outline:
    "border border-gray-300 text-gray-500 pointer-events-none cursor-not-allowed",
};

export const variants = {
  solid: "bg-gray-100 text-gray-900",
  outline: "border border-gray-500 text-gray-900",
};

export const optionsContainerClass =
  "absolute z-50 mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-sm shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none";

export const optionClass =
  "relative block cursor-pointer select-none truncate py-2 pl-8 pr-2";

export const optionStateClass = {
  active: "bg-gray-100 text-gray-900",
  default: "text-gray-900",
};

export const autocompleteClass =
  "flex w-full items-center justify-between gap-2";

export const inputClass =
  "flex w-full items-center justify-between pr-10 focus:outline-none focus:ring-1";

export const containerClass = "relative mt-1";

export const selectedIconClass =
  "text-amber-600 absolute inset-y-0 left-0 flex items-center pl-3";

export const transitionClass = {
  leave: "transition ease-in duration-100",
  leaveFrom: "opacity-100",
  leaveTo: "opacity-0",
};

export const emptyStateClass = "relative cursor-default select-none py-2 px-4 text-gray-700";

export const comboboxButtonClass = "absolute inset-y-0 right-0 flex items-center pr-2";

export const errorClass = "ring-1 ring-red-400";
