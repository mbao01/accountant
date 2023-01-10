import { Popover as HeadlessPopover, Transition } from "@headlessui/react";
import { Fragment } from "react";
import { popoverPanelClass, popoverTransition } from "./classes";
import type { PopoverProps } from "./types";

export const Popover: React.FC<PopoverProps> = (props) => {
  const { trigger, children } = props;

  return (
    <HeadlessPopover className="relative">
      {({ open, close }) => (
        <>
          <HeadlessPopover.Button>
            {typeof trigger === "function"
              ? trigger({ open, closePopover: close })
              : trigger}
          </HeadlessPopover.Button>
          <Transition as={Fragment} {...popoverTransition}>
            <HeadlessPopover.Panel className={popoverPanelClass}>
              {typeof children === "function"
                ? children({ open, closePopover: close })
                : children}
            </HeadlessPopover.Panel>
          </Transition>
        </>
      )}
    </HeadlessPopover>
  );
};
