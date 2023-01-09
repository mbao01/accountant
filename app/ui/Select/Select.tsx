import React, { Fragment, useState } from "react";
import { Listbox, Transition } from "@headlessui/react";
import clsx from "clsx";
import { ChevronDownIcon, ChevronUpIcon } from "../Icons";
import {
  containerClass,
  disabledClass,
  errorClasses,
  labelClass,
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
import { useDispatchInputEvent } from "~/hooks/useDispatchInputEvent";

export const Select: React.FC<SelectProps> = (props) => {
  const {
    name,
    size = "md",
    label,
    outline,
    options,
    disabled,
    required,
    isInvalid,
    className,
  } = props;

  const [selected, setSelected] = useState(options[0]);
  const value = selected?.id ?? selected?.value ?? selected.label;
  const inputRef = useDispatchInputEvent(value);

  return (
    <Listbox value={selected} disabled={disabled} onChange={setSelected}>
      <div className={containerClass}>
        {label && (
          <label
            htmlFor={name}
            className={clsx(labelClass[size], {
              "text-gray-600": !disabled,
              [errorClasses.text]: !disabled && isInvalid,
            })}
          >
            {label}
            {required && "*"}
          </label>
        )}
        <div className={clsx(selectContainerClass, className)}>
          {name && <input ref={inputRef} id={name} name={name} type="hidden" />}
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
                    [errorClasses.border]: isInvalid,
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
      </div>
    </Listbox>
  );
};
