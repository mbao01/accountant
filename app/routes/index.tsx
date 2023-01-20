import { Link } from "@remix-run/react";
import { AddRecord } from "~/components/AddRecord";
import { CreateRecordCategory } from "~/components/CreateRecordCategory";
import { CreateRecordType } from "~/components/CreateRecordType";
import { ModalId } from "~/hooks/useModalController/types";
import { useOpenModal } from "~/hooks/useModalController/useOpenModal";
import { Route } from "~/routes.enum";
import { Button } from "~/ui/Button";
import { Popover } from "~/ui/Popover";

export default function Index() {
  const openModal = useOpenModal();

  return (
    <div className="relative mt-40 flex flex-wrap justify-center gap-8 bg-white">
      <Popover trigger={() => <Button size="lg">New record type</Button>}>
        <CreateRecordType />
      </Popover>
      <Popover trigger={() => <Button size="lg">New record category</Button>}>
        <CreateRecordCategory />
      </Popover>
      <Link to={Route.REGISTER}>
        <Button size="lg">Add User</Button>
      </Link>
      <Button
        size="lg"
        onClick={() => openModal(ModalId.CREATE_ACCOUNT, Route.ACCOUNTS)}
      >
        Create Account
      </Button>
      <Popover trigger={() => <Button size="lg">Add record</Button>}>
        <AddRecord />
      </Popover>
    </div>
  );
}
