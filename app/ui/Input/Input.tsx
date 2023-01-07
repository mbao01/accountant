import clsx from "clsx";
import {
  sizes,
  infoClass,
  infoTypeClass,
  inputClass,
  labelClass,
  disabledClass,
  inputWrapperClass,
} from "./classes";
import type { InputProps } from "./types";

export const Input: React.FC<InputProps> = (props) => {
  const {
    name,
    size = "md",
    label,
    hint,
    error,
    disabled,
    required,
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
        })}
      >
        {label}
        {required && "*"}
      </div>
      <input
        id={name}
        name={name}
        disabled={disabled}
        required={required}
        placeholder={placeholder}
        className={clsx(inputClass, sizes[size], {
          [disabledClass]: disabled,
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
