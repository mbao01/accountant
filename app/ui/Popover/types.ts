import type { MutableRefObject, ReactElement, ReactNode } from "react";

export type PopoverProps = {
  trigger: ReactNode | ((props?: { open: boolean }) => ReactElement);
  children:
    | ReactNode
    | ((props?: {
        open: boolean;
        close: (
          focusableElement?: HTMLElement | MutableRefObject<HTMLElement | null>
        ) => void;
      }) => ReactElement);
};
