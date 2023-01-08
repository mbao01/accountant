import { Combobox } from "@headlessui/react";
import clsx from "clsx";
import React from "react";
import { CheckIcon } from "../Icons";
import { optionClass, optionStateClass, selectedIconClass } from "./classes";
import type { TOption } from "./types";

const _Option: React.FC<{ option: TOption }> = ({ option }) => (
  <Combobox.Option
    key={option.label}
    value={option}
    className={({ active }) =>
      clsx(optionClass, {
        [optionStateClass.active]: active,
        [optionStateClass.default]: !active,
      })
    }
  >
    {({ selected }) => (
      <>
        {option.label}
        {selected ? (
          <span className={selectedIconClass}>
            <CheckIcon size="sm" />
          </span>
        ) : null}
      </>
    )}
  </Combobox.Option>
);

export const Option = React.memo(_Option);
