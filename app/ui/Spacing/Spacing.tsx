import clsx from "clsx";
import React from "react";
import type { SpacingProps } from "./types";

export const Spacing: React.FC<SpacingProps> = ({ as, horizontal, vertical = "2" }) =>
  React.createElement(as ?? "div", {
    className: clsx({
      [`my-${vertical}`]: vertical,
      [`mx-${horizontal}`]: horizontal,
    }),
  });
