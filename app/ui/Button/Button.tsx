import clsx from "clsx";
import { outlines, sizes, variants, disabledClasses } from "./constant";
import type { ButtonProps } from "./types";

export const Button: React.FC<ButtonProps> = (props) => {
  const {
    size = "md",
    type = "button",
    variant = "primary",
    outline,
    disabled,
    children,
  } = props;

  return (
    <button
      type={type}
      className={clsx(
        "uppercase shadow-inner transition",
        sizes[size],
        disabled && {
          [disabledClasses.solid]: !outline,
          [disabledClasses.outline]: outline,
        },
        !disabled && {
          [variants[variant]]: !outline,
          [outlines[variant]]: outline,
        }
      )}
      disabled={disabled}
    >
      {children}
    </button>
  );
};
