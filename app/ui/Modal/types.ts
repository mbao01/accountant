import type { ReactNode } from "react";

type ChildrenRenderFunction = (props?: {
  open: boolean;
  closeModal: () => void;
}) => ReactNode;

export type ModalProps = {
  open: boolean;
  title?: string;
  onClose?: () => void;
  description?: string;
  children: ReactNode | ChildrenRenderFunction;
};
