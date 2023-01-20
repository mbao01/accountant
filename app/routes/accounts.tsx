import { Outlet } from "@remix-run/react";
import { NewAccount } from "~/components/NewAccount";
import { useModalController } from "~/hooks/useModalController";
import { ModalId } from "~/hooks/useModalController/types";
import { Modal } from "~/ui/Modal";

const Accounts = () => {
  const { modals, onCloseModal } = useModalController([ModalId.CREATE_ACCOUNT]);

  return (
    <>
      <Outlet />
      {modals.get(ModalId.CREATE_ACCOUNT) && (
        <Modal open onClose={onCloseModal}>
          <NewAccount />
        </Modal>
      )}
    </>
  );
};

export default Accounts;
