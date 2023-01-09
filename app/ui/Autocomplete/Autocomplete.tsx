import { Fragment, useState } from "react";
import { Combobox, Transition } from "@headlessui/react";
import clsx from "clsx";
import { Option } from "./Option";
import {
  autocompleteClass,
  comboboxButtonClass,
  containerClass,
  disabledClass,
  emptyStateClass,
  errorClass,
  inputClass,
  optionsContainerClass,
  sizes,
  transitionClass,
  variants,
} from "./classes";
import type { AutocompleteProps, TOption } from "./types";
import { ChevronUpDownIcon } from "../Icons";
import { useDispatchInputEvent } from "~/hooks/useDispatchInputEvent";

export const Autocomplete = (props: AutocompleteProps) => {
  const { name, size = "md", outline, options, disabled, isInvalid } = props;

  const [query, setQuery] = useState("");
  const [selected, setSelected] = useState(options[0]);
  const value = selected?.id ?? selected?.value ?? selected.label;
  const inputRef = useDispatchInputEvent(value);

  const filteredOptions =
    query === ""
      ? options
      : options.filter((option) =>
          option.label
            .toLowerCase()
            .replace(/\s+/g, "")
            .includes(query.toLowerCase().replace(/\s+/g, ""))
        );

  return (
    <Combobox value={selected} disabled={disabled} onChange={setSelected}>
      {name && <input ref={inputRef} name={name} type="hidden" />}
      <div className={containerClass}>
        <div className={autocompleteClass}>
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
                    [errorClass]: isInvalid,
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
    </Combobox>
  );
};
