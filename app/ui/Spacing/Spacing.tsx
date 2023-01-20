import clsx from "clsx";
import React from "react";
import type { SpacingProps } from "./types";

export const Spacing: React.FC<SpacingProps> = ({
  as,
  horizontal,
  vertical = "2",
}) => (
  <div
    className={clsx({
      [`py-${vertical}`]: vertical,
      [`px-${horizontal}`]: horizontal,
    })}
  >
    {as && React.createElement(as)}
  </div>
);

