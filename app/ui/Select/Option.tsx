import { Listbox } from "@headlessui/react";
import clsx from "clsx";
import React from "react";
import { optionClass, optionStateClass } from "./classes";
import type { TOption } from "./types";

const _Option: React.FC<{ option: TOption }> = ({ option }) => (
  <Listbox.Option
    key={option.label}
    value={option}
    className={({ active }) =>
      clsx(optionClass, {
        [optionStateClass.active]: active,
        [optionStateClass.default]: !active,
      })
    }
  >
    {option.label}
  </Listbox.Option>
);

export const Options = React.memo(_Option);
