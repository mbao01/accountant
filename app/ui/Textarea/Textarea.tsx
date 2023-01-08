import clsx from "clsx";
import {
  sizes,
  infoClass,
  infoTypeClass,
  textareaClass,
  labelClass,
  disabledClass,
  textareaWrapperClass,
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
