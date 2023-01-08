import type { TSize } from "../types";

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

export const triggerClass = "flex w-full items-center justify-between gap-2";

export const variants = {
  solid: "bg-gray-100 text-gray-900",
  outline: "border border-gray-500 text-gray-900",
};

export const menuClass = "relative inline-block";

export const menuItemsClass =
  "absolute right-0 z-10 mt-2 w-56 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none";

export const menuItemsContainerClass = 'py-1';

export const menuItemClass = "px-4 py-2 cursor-pointer w-full text-left text-sm";

export const menuItemStateClass = {
  active: "bg-gray-100 text-gray-900",
  default: "text-gray-900",
  disabled: "text-gray-500 pointer-events-none cursor-not-allowed",
};

export const transitionClass = {
  enter: "transition ease-out duration-100",
  enterFrom: "transform opacity-0 scale-95",
  enterTo: "transform opacity-100 scale-100",
  leave: "transition ease-in duration-75",
  leaveFrom: "transform opacity-100 scale-100",
  leaveTo: "transform opacity-0 scale-95",
};
