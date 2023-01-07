import clsx from "clsx";
import type { SpacingProps } from "./types";

export const Spacing: React.FC<SpacingProps> = ({
  vertical = "2",
  horizontal,
}) => (
  <div
    className={clsx({
      [`h-${vertical}`]: vertical,
      [`w-${vertical}`]: horizontal,
    })}
  />
);
