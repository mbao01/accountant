import { Fragment } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { XCircleIcon } from "../Icons";
import {
  backdropClass,
  backdropTransition,
  closeButtonClass,
  dialogClass,
  dialogDescriptionClass,
  dialogPanelClass,
  dialogPanelContainerClass,
  dialogTitleClass,
  dialogTransition,
} from "./classes";
import type { ModalProps } from "./types";

export const Modal: React.FC<ModalProps> = (props) => {
  const { open, title, onClose, children, description } = props;

  const onCloseModal = () => {
    console.log("On Close");
    onClose?.();
  };

  return (
    <Transition appear show={open} as={Fragment}>
      <Dialog
        as="div"
        open={open}
        className={dialogClass}
        onClose={onCloseModal}
      >
        <Transition.Child as={Fragment} {...backdropTransition}>
          <div className={backdropClass} />
        </Transition.Child>

        <div className={dialogPanelContainerClass}>
          <Transition.Child as={Fragment} {...dialogTransition}>
            <Dialog.Panel className={dialogPanelClass}>
              <button
                type="button"
                className={closeButtonClass}
                onClick={onCloseModal}
              >
                <XCircleIcon size="lg" />
              </button>
              {title && (
                <>
                  <Dialog.Title as="h3" className={dialogTitleClass}>
                    {title}
                  </Dialog.Title>
                  {description && (
                    <Dialog.Description className={dialogDescriptionClass}>
                      {description}
                    </Dialog.Description>
                  )}
                </>
              )}
              {typeof children === "function"
                ? children({ open, closeModal: onCloseModal })
                : children}
            </Dialog.Panel>
          </Transition.Child>
        </div>
      </Dialog>
    </Transition>
  );
};
