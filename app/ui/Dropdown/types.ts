import type { ElementType } from "react";
import type { TSize } from "../types";

type TMenuItemObject<T = ElementType> = {
  as?: T;
  label: string;
  type?: string;
  value?: string;
  className?: string;
  onClick?: (value: TMenuItemObject["value"]) => void;
} & React.HTMLProps<T>;

export type TMenuItem<T = ElementType> = string | TMenuItemObject<T>;

export type DropdownProps = {
  size?: TSize;
  outline?: boolean;
  disabled?: boolean;
  items: TMenuItem[];
};
