import clsx from "clsx";
import {
  sizes,
  infoClasses,
  inputClasses,
  labelClasses,
  disabledClasses,
  inputWrapperClasses,
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
      className={clsx(inputWrapperClasses, {
        [disabledClasses]: disabled,
      })}
      htmlFor={name}
    >
      <div
        className={clsx(labelClasses[size], {
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
        className={clsx(inputClasses, sizes[size], {
          [disabledClasses]: disabled,
        })}
      />
      <div
        className={clsx("absolute -bottom-6", {
          [infoClasses.error]: error,
          [infoClasses.hint]: !error,
        })}
      >
        {info}
      </div>
    </label>
  );
};
