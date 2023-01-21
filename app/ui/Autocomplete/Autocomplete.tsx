import { Fragment, useCallback, useState } from "react";
import { Combobox, Transition } from "@headlessui/react";
import clsx from "clsx";
import { Option } from "./Option";
import {
  comboboxClass,
  comboboxButtonClass,
  containerClass,
  disabledClass,
  emptyStateClass,
  errorClasses,
  inputClass,
  labelClass,
  optionsContainerClass,
  sizes,
  transitionClass,
  variants,
  comboboxContainerClass,
} from "./classes";
import type { AutocompleteProps, TOption } from "./types";
import { ChevronUpDownIcon } from "../Icons";

export const Autocomplete = (props: AutocompleteProps) => {
  const {
    name,
    size = "md",
    label,
    outline,
    options,
    disabled,
    required,
    isInvalid,
    onValidate,
  } = props;

  const [query, setQuery] = useState("");
  const [selected, setSelected] = useState(options[0]);
  const value = selected?.id ?? selected?.value ?? selected.label;

  const filteredOptions =
    query === ""
      ? options
      : options.filter((option) =>
          option.label
            .toLowerCase()
            .replace(/\s+/g, "")
            .includes(query.toLowerCase().replace(/\s+/g, ""))
        );

  const handleChange = useCallback(
    (option: TOption) => {
      setSelected(option);
      if (name) {
        const value = option?.id ?? option?.value ?? option.label;
        onValidate?.({ name, value });
      }
    },
    [name, onValidate]
  );

  return (
    <Combobox value={selected} disabled={disabled} onChange={handleChange}>
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
        {name && <input id={name} name={name} type="hidden" value={value} />}
        <div className={comboboxContainerClass}>
          <div className={comboboxClass}>
            <Combobox.Input
              className={clsx(
                sizes[size],
                inputClass,
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
              displayValue={(option: TOption) => option.label}
              onChange={(event) => setQuery(event.target.value)}
            />
            <Combobox.Button
              className={clsx(
                comboboxButtonClass,
                disabled && disabledClass.solid
              )}
            >
              <ChevronUpDownIcon size={size} />
            </Combobox.Button>
          </div>
          <Transition
            as={Fragment}
            {...transitionClass}
            afterLeave={() => setQuery("")}
          >
            <Combobox.Options className={optionsContainerClass}>
              {filteredOptions.length === 0 && query !== "" ? (
                <div className={emptyStateClass}>Nothing found.</div>
              ) : (
                filteredOptions.map((option) => (
                  <Option key={option.id ?? option.label} option={option} />
                ))
              )}
            </Combobox.Options>
          </Transition>
        </div>
      </div>
    </Combobox>
  );
};
