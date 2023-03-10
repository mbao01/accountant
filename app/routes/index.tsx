import { Link } from "@remix-run/react";
import { type LoaderArgs } from "@remix-run/node";
import httpStatus from "http-status";
import { typedjson, useTypedLoaderData } from "remix-typedjson";
import { AddRecord } from "~/components/AddRecord";
import { CreateRecordCategory } from "~/components/CreateRecordCategory";
import { CreateRecordType } from "~/components/CreateRecordType";
import { RecordCategoryList } from "~/components/RecordCategoryList";
import { RecordTypeList } from "~/components/RecordTypeList";
import { UserList } from "~/components/UserList";
import { ModalId } from "~/hooks/useModalController/types";
import { useOpenModal } from "~/hooks/useModalController/useOpenModal";
import { getRecordCategories, getRecordTypes } from "~/models/record.server";
import { getUsers } from "~/models/user.server";
import { Route } from "~/routes.enum";
import { getUser } from "~/session.server";
import { Button } from "~/ui/Button";
import { Popover } from "~/ui/Popover";

export const loader = async ({ request }: LoaderArgs) => {
  const currentUser = await getUser(request);
  const recordTypes = await getRecordTypes({ _count: true });

  const recordCategories = await getRecordCategories({
    _count: true,
    RecordType: { select: { name: true } },
  });

  let users = null;
  if (currentUser?.role === "OWNER") {
    users = await getUsers({ _count: true });
  }

  return typedjson(
    { success: true, data: { users, recordTypes, recordCategories } },
    httpStatus.OK
  );
};

export default function Index() {
  const openModal = useOpenModal();
  const {
    data: { users, recordTypes, recordCategories },
  } = useTypedLoaderData<typeof loader>();

  return (
    <>
      <div className="flex flex-wrap justify-center gap-10">
        <Popover trigger={() => <Button size="md">New record type</Button>}>
          <CreateRecordType />
        </Popover>
        <Popover trigger={() => <Button size="md">New record category</Button>}>
          <CreateRecordCategory />
        </Popover>
        <Link to={Route.REGISTER} prefetch="intent">
          <Button size="md">Add User</Button>
        </Link>
        <Button
          size="md"
          onClick={() => openModal(ModalId.CREATE_ACCOUNT, Route.ACCOUNTS)}
        >
          Create Account
        </Button>
        <Popover trigger={() => <Button size="md">Add record</Button>}>
          <AddRecord />
        </Popover>
      </div>
      <div className="flex flex-wrap justify-center gap-10 py-20">
        <RecordTypeList items={recordTypes} />
        <RecordCategoryList items={recordCategories} />
        {users && <UserList items={users} />}
      </div>
    </>
  );
}
