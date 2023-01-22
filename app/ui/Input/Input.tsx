import clsx from "clsx";
import React from "react";
import {
  sizes,
  infoClass,
  infoTypeClass,
  inputClass,
  labelClass,
  disabledClass,
  inputWrapperClass,
  errorClasses,
} from "./classes";
import type { InputProps } from "./types";

export const Input: React.FC<InputProps> = React.memo((props) => {
  const {
    name,
    step,
    size = "md",
    hint,
    type = "text",
    label,
    error,
    disabled,
    required,
    autoFocus,
    inputMode,
    isInvalid,
    placeholder,
    onValidate,
    className,
  } = props;
  const info = hint || error;

  return (
    <label
      htmlFor={name}
      className={clsx(inputWrapperClass, {
        [disabledClass]: disabled,
      })}
    >
      {label && (
        <div
          className={clsx(labelClass[size], {
            "text-gray-600": !disabled,
            [errorClasses.text]: !disabled && isInvalid,
          })}
        >
          {label}
          {required && " *"}
        </div>
      )}
      <input
        id={name}
        name={name}
        step={step}
        type={type}
        onChange={(e) => onValidate?.({ name, value: e.target.value })}
        disabled={disabled}
        required={required}
        autoFocus={autoFocus}
        inputMode={inputMode}
        placeholder={placeholder}
        className={clsx(className, inputClass, sizes[size], {
          [disabledClass]: disabled,
          [errorClasses.border]: !disabled && isInvalid,
        })}
        autoComplete="chrome-off"
      />
      <div
        className={clsx(infoClass, {
          [infoTypeClass.error]: error,
          [infoTypeClass.hint]: !error,
        })}
      >
        {info}
      </div>
    </label>
  );
});
