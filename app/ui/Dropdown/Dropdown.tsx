import { Fragment } from "react";
import clsx from "clsx";
import { Menu, Transition } from "@headlessui/react";
import {
  disabledClass,
  menuClass,
  menuItemsClass,
  menuItemsContainerClass,
  sizes,
  transitionClass,
  triggerClass,
  variants,
} from "./classes";
import { ChevronDownIcon, ChevronUpIcon } from "../Icons";
import type { DropdownProps } from "./types";
import { createMenuItem } from "./utils";

export const Dropdown: React.FC<DropdownProps> = (props) => {
  const { size = "md", outline, disabled, items } = props;

  return (
    <Menu as="div" className={menuClass}>
      <Menu.Button
        disabled={disabled}
        className={clsx(
          sizes[size],
          triggerClass,
          disabled
            ? {
                [disabledClass.solid]: !outline,
                [disabledClass.outline]: outline,
              }
            : {
                [variants.solid]: !outline,
                [variants.outline]: outline,
              }
        )}
      >
        {({ open }) => (
          <>
            Options{" "}
            {open ? (
              <ChevronUpIcon size={size} />
            ) : (
              <ChevronDownIcon size={size} />
            )}
          </>
        )}
      </Menu.Button>

      <Transition as={Fragment} {...transitionClass}>
        <Menu.Items className={menuItemsClass}>
          <div className={menuItemsContainerClass}>
            {items.map(createMenuItem)}
          </div>
        </Menu.Items>
      </Transition>
    </Menu>
  );
};
