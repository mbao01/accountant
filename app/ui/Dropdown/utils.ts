import { Menu } from "@headlessui/react";
import { clsx } from "clsx";
import { createElement } from "react";
import { menuItemClass } from "./classes";
import type { TMenuItem } from "./types";

export const createMenuItem = (item: TMenuItem) => {
  const {
    as = "button",
    type,
    label,
    value,
    onClick,
    className,
    ...props
  } = typeof item === "string"
    ? {
        label: item,
        type: undefined,
        value: undefined,
        onClick: undefined,
        className: undefined,
      }
    : item;
  const normType = type ?? as === "button" ? "button" : undefined;

  return createElement(
    Menu.Item,
    {
      as,
      type: normType,
      key: value ?? label,
      className: clsx(menuItemClass, className),
      onClick: onClick ? () => onClick(value) : undefined,
      ...props,
    },
    label
  );
};
