import { Listbox } from "@headlessui/react";
import clsx from "clsx";
import React from "react";
import { optionClass, optionStateClass } from "./classes";
import type { TOption } from "./types";

const _Option: React.FC<{ option: TOption; className?: string }> = ({
  option,
  className,
}) => (
  <Listbox.Option
    value={option}
    className={({ active }) =>
      clsx(className, optionClass, {
        [optionStateClass.active]: active,
        [optionStateClass.default]: !active,
      })
    }
  >
    {option.label}
  </Listbox.Option>
);

export const Option = React.memo(_Option);
