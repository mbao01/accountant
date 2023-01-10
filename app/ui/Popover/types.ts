import type { MutableRefObject, ReactNode } from "react";

type RenderFunction = (props?: {
  open: boolean;
  closePopover: (
    ref?: MutableRefObject<HTMLElement | null> | HTMLElement
  ) => void;
}) => ReactNode;

export type PopoverProps = {
  trigger: ReactNode | RenderFunction;
  children: ReactNode | RenderFunction;
};
