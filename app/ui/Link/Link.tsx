import clsx from "clsx";
import { createElement } from "react";
import { linkClass, variants } from "./classes";
import type { LinkProps } from "./types";

export const Link: React.FC<LinkProps> = (props) => {
  const {
    as = "a",
    size,
    variant = "secondary",
    children,
    className,
    underline,
    ...rest
  } = props;

  return createElement(
    as,
    {
      ...rest,
      className: clsx(className, linkClass, variants[variant], {
        [`text-${size}`]: size,
        underline: underline,
      }),
    },
    children
  );
};
