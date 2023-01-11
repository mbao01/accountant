import { useState } from "react";
import { AddRecord } from "~/components/AddRecord";
import { CreateRecordCategory } from "~/components/CreateRecordCategory";
import { CreateRecordType } from "~/components/CreateRecordType";
import { NewAccount } from "~/components/NewAccount";
import { Modal } from "~/ui/Modal";
import { Popover } from "~/ui/Popover";

export default function Index() {
  const [open, setOpen] = useState(false);
  return (
    <main className="relative min-h-screen gap-6 bg-white sm:flex sm:items-center sm:justify-center">
      <button onClick={() => setOpen(true)}>Create account</button>
      <Modal open={open} onClose={() => setOpen(false)}>
        <NewAccount />
      </Modal>
      <Popover trigger="Create record type">
        <CreateRecordType />
      </Popover>
      <Popover trigger="Create record category">
        <CreateRecordCategory />
      </Popover>
      <Popover trigger="Add record">
        <AddRecord />
      </Popover>
    </main>
  );
}
