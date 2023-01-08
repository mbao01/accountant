import clsx from "clsx";
import {
  sizes,
  infoClass,
  infoTypeClass,
  textareaClass,
  labelClass,
  disabledClass,
  textareaWrapperClass,
  errorClasses,
} from "./classes";
import type { TextareaProps } from "./types";

export const Textarea: React.FC<TextareaProps> = (props) => {
  const {
    name,
    size = "md",
    rows = 2,
    hint,
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
      className={clsx(textareaWrapperClass, {
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
      <textarea
        id={name}
        rows={rows}
        name={name}
        disabled={disabled}
        required={required}
        placeholder={placeholder}
        className={clsx(textareaClass, sizes[size], {
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
