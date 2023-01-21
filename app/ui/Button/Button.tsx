import clsx from "clsx";
import {
  buttonClass,
  outlines,
  sizes,
  variants,
  disabledClass,
} from "./classes";
import type { ButtonProps } from "./types";

export const Button: React.FC<ButtonProps> = (props) => {
  const {
    size = "md",
    type = "button",
    variant = "primary",
    onClick,
    outline,
    disabled,
    children,
    className,
  } = props;

  return (
    <button
      type={type}
      className={clsx(
        className,
        buttonClass,
        sizes[size],
        disabled && {
          [disabledClass.solid]: !outline,
          [disabledClass.outline]: outline,
        },
        !disabled && {
          [variants[variant]]: !outline,
          [outlines[variant]]: outline,
        }
      )}
      disabled={disabled}
      onClick={onClick}
    >
      {children}
    </button>
  );
};
