import clsx from "clsx";
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

export const Input: React.FC<InputProps> = (props) => {
  const {
    name,
    size = "md",
    hint,
    type = "text",
    label,
    error,
    disabled,
    required,
    isInvalid,
    placeholder,
  } = props;
  const info = hint || error;

  return (
    <label
      className={clsx(inputWrapperClass, {
        [disabledClass]: disabled,
      })}
      htmlFor={name}
    >
      <div
        className={clsx(labelClass[size], {
          "text-gray-600": !disabled,
          [errorClasses.text]: !disabled && isInvalid,
        })}
      >
        {label}
        {required && "*"}
      </div>
      <input
        id={name}
        name={name}
        type={type}
        disabled={disabled}
        required={required}
        placeholder={placeholder}
        className={clsx(inputClass, sizes[size], {
          [disabledClass]: disabled,
          [errorClasses.border]: !disabled && isInvalid,
        })}
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
};
