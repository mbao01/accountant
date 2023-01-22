import React, { Fragment, useCallback, useEffect, useState } from "react";
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
import type { SelectProps, TOption } from "./types";
import { Option } from "./Option";

export const Select: React.FC<SelectProps> = React.memo((props) => {
  const {
    name,
    size = "md",
    label,
    outline,
    options,
    disabled,
    required,
    onSelect,
    isInvalid,
    className,
    onValidate,
    defaultValue,
  } = props;

  const [selected, setSelected] = useState(
    () =>
      options.find((option) => option.value === defaultValue) ??
      ({ value: "" } as TOption) // when `value` is available in option and `defaultValue` is not set, this acts like a typical dropdown
  );

  const handleSelect = useCallback(
    (option: TOption) => {
      setSelected(option);
      if (name) {
        const value = option.value;
        onSelect?.(option);
        onValidate?.({ name, value });
      }
    },
    [name, onValidate, onSelect]
  );

  useEffect(() => {
    // validate if default value is set
    if (defaultValue && name) {
      onValidate?.({ name, value: defaultValue });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Listbox value={selected} disabled={disabled} onChange={handleSelect}>
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
            {required && " *"}
          </label>
        )}
        <div className={clsx(selectContainerClass, className)}>
          {name && (
            <input
              id={name}
              name={name}
              type="hidden"
              value={selected?.value}
            />
          )}
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
                <span className={selectOptionClass}>{value?.label}</span>
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
                <Option
                  key={option.value ?? option.id}
                  option={option}
                  className={labelClass[size]}
                />
              ))}
            </Listbox.Options>
          </Transition>
        </div>
      </div>
    </Listbox>
  );
});
