import type { TSize } from "../types";

export type SVGProps = {
  value: JSX.Element;
  size?: TSize | "xl";
  className?: string;
};

export type IconProps = Omit<SVGProps, "value">;
