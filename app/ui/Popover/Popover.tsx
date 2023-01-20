import { Fragment } from "react";
import { Popover as HeadlessPopover, Transition } from "@headlessui/react";
import { popoverClass, popoverPanelClass, popoverTransition } from "./classes";
import type { PopoverProps } from "./types";

export const Popover: React.FC<PopoverProps> = (props) => {
  const { trigger, children } = props;

  return (
    <HeadlessPopover className={popoverClass}>
      <>
        <HeadlessPopover.Button
          as={typeof trigger === "function" ? "div" : "button"}
        >
          {trigger}
        </HeadlessPopover.Button>
        <Transition as={Fragment} {...popoverTransition}>
          <HeadlessPopover.Panel className={popoverPanelClass}>
            {children}
          </HeadlessPopover.Panel>
        </Transition>
      </>
    </HeadlessPopover>
  );
};
