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
import type { SelectProps } from "./types";
import { Option } from "./Option";
import { useDispatchInputEvent } from "~/hooks/useDispatchInputEvent";

export const Select: React.FC<SelectProps> = React.memo((props) => {
  const {
    name,
    size = "md",
    label,
    onBlur,
    outline,
    options,
    disabled,
    required,
    isInvalid,
    className,
    defaultValue,
  } = props;

  const [selected, setSelected] = useState(
    () => options.find((option) => option.value === defaultValue) // when `value` is available in option and `defaultValue` is not set, this acts like a typical dropdown
  );
  const inputValue = selected?.value ?? selected?.id;
  const inputRef = useDispatchInputEvent(inputValue);

  const handleBlur = useCallback(
    (e: any) => {
      if (onBlur) {
        e.target = inputRef.current;
        onBlur(e);
      }
    },
    [inputRef, onBlur]
  );

  useEffect(() => {
    // validate if default value is set
    if (defaultValue) {
      onBlur?.({ target: inputRef.current } as any);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

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
          {name && (
            <input
              ref={inputRef}
              id={name}
              name={name}
              type="hidden"
              defaultValue={defaultValue}
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
            <Listbox.Options
              onBlur={handleBlur}
              className={optionsContainerClass}
            >
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
