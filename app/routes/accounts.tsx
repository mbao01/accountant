import { Outlet } from "@remix-run/react";
import { Layout } from "~/components/Layout";
import { NewAccount } from "~/components/NewAccount";
import { useModalController } from "~/hooks/useModalController";
import { Modal } from "~/ui/Modal";

const Accounts = () => {
  const { modals, onCloseModal } = useModalController(["create_account"]);

  return (
    <Layout>
      <Outlet />
      {modals.get("create_account") && (
        <Modal open onClose={onCloseModal}>
          <NewAccount />
        </Modal>
      )}
    </Layout>
  );
};

export default Accounts;
