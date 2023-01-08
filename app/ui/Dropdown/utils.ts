import { Menu } from "@headlessui/react";
import { clsx } from "clsx";
import { createElement } from "react";
import { menuItemClass, menuItemStateClass } from "./classes";
import type { TMenuItem } from "./types";

export const createMenuItem = (item: TMenuItem) => {
  const {
    as = "button",
    type,
    label,
    value,
    onClick,
    disabled,
    className,
    ...props
  } = typeof item === "string"
    ? {
        label: item,
        type: undefined,
        value: undefined,
        onClick: undefined,
        disabled: false,
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
      disabled,
      className: ({ active }: { active: boolean }) =>
        clsx(menuItemClass, className, {
          [menuItemStateClass.active]: active,
          [menuItemStateClass.default]: !active,
          [menuItemStateClass.disabled]: disabled,
        }),
      onClick: onClick ? () => onClick(value) : undefined,
      ...props,
    },
    label
  );
};
