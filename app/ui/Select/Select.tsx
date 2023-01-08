import React, { Fragment, useState } from "react";
import { Listbox, Transition } from "@headlessui/react";
import clsx from "clsx";
import { ChevronDownIcon, ChevronUpIcon } from "../Icons";
import {
  disabledClass,
  optionsContainerClass,
  selectClass,
  selectContainerClass,
  selectOptionClass,
  sizes,
  transitionClass,
  variants,
} from "./classes";
import type { SelectProps } from "./types";
import { Options } from "./Option";

export const Select: React.FC<SelectProps> = (props) => {
  const { name, size = "md", outline, options, disabled, className } = props;
  const [selected, setSelected] = useState(options[0]);

  return (
    <Listbox value={selected} disabled={disabled} onChange={setSelected}>
      {name && (
        <input
          name={name}
          type="hidden"
          value={selected?.id ?? selected?.label}
        />
      )}
      <div className={clsx(selectContainerClass, className)}>
        <Listbox.Button
          className={clsx(
            sizes[size],
            selectClass,
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
          {({ open, value }) => (
            <>
              <span className={selectOptionClass}>{value.label}</span>
              {open ? (
                <ChevronUpIcon size={size} />
              ) : (
                <ChevronDownIcon size={size} />
              )}
            </>
          )}
        </Listbox.Button>
        <Transition as={Fragment} {...transitionClass}>
          <Listbox.Options className={optionsContainerClass}>
            {options.map((option) => (
              <Options key={option.id ?? option.label} option={option} />
            ))}
          </Listbox.Options>
        </Transition>
      </div>
    </Listbox>
  );
};
