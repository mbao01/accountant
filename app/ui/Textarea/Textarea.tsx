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
    onBlur,
    disabled,
    required,
    isInvalid,
    placeholder,
  } = props;
  const info = hint || error;

  return (
    <label
      htmlFor={name}
      className={clsx(textareaWrapperClass, {
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
      <textarea
        id={name}
        rows={rows}
        name={name}
        onBlur={onBlur}
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
