import { useLoaderData } from "@remix-run/react";
import { json } from "@remix-run/server-runtime";
import { useState } from "react";
import { AddRecord } from "~/components/AddRecord";
import { CreateRecordCategory } from "~/components/CreateRecordCategory";
import { CreateRecordType } from "~/components/CreateRecordType";
import { NewAccount } from "~/components/NewAccount";
import { prisma } from "~/db.server";
import { Modal } from "~/ui/Modal";
import { Popover } from "~/ui/Popover";

export const loader = async () => {
  const recordTypes = await prisma.recordType.findMany();
  return json({ success: true, data: recordTypes }, 200);
};

export default function Index() {
  const [open, setOpen] = useState(false);
  const { data } = useLoaderData<typeof loader>();

  return (
    <div>
      <data>{JSON.stringify(data, null, 2)}</data>

      <main className="relative mt-11 gap-6 bg-white sm:flex sm:items-center sm:justify-center">
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
    </div>
  );
}
