import { Outlet } from "@remix-run/react";
import { Layout } from "~/components/Layout";
import { NewAccount } from "~/components/NewAccount";
import { useModalController } from "~/hooks/useModalController";
import { ModalId } from "~/hooks/useModalController/types";
import { Modal } from "~/ui/Modal";

const Accounts = () => {
  const { modals, onCloseModal } = useModalController([ModalId.CREATE_ACCOUNT]);

  return (
    <Layout>
      <Outlet />
      {modals.get(ModalId.CREATE_ACCOUNT) && (
        <Modal open onClose={onCloseModal}>
          <NewAccount />
        </Modal>
      )}
    </Layout>
  );
};

export default Accounts;
