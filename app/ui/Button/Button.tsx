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
    loading,
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
        },
        loading && "animate-pulse"
      )}
      disabled={loading || disabled}
      onClick={onClick}
    >
      {children}
    </button>
  );
};
