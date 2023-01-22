import { Link, useLoaderData } from "@remix-run/react";
import { json, type LoaderFunction } from "@remix-run/server-runtime";
import httpStatus from "http-status";
import { AddRecord } from "~/components/AddRecord";
import { CreateRecordCategory } from "~/components/CreateRecordCategory";
import { CreateRecordType } from "~/components/CreateRecordType";
import { RecordCategoryList } from "~/components/RecordCategoryList";
import { RecordTypeList } from "~/components/RecordTypeList";
import { UserList } from "~/components/UserList";
import { prisma } from "~/db.server";
import { ModalId } from "~/hooks/useModalController/types";
import { useOpenModal } from "~/hooks/useModalController/useOpenModal";
import { Route } from "~/routes.enum";
import { getUser } from "~/session.server";
import { Button } from "~/ui/Button";
import { Popover } from "~/ui/Popover";

export const loader: LoaderFunction = async ({ request }) => {
  const currentUser = await getUser(request);
  const recordTypes = await prisma.recordType.findMany({
    select: {
      _count: true,
      id: true,
      name: true,
      tag: true,
      description: true,
    },
  });

  const recordCategories = await prisma.recordCategory.findMany({
    select: {
      _count: true,
      id: true,
      name: true,
      description: true,
      RecordType: {
        select: {
          name: true,
        },
      },
    },
  });

  let users = null;
  if (currentUser?.role === "OWNER") {
    users = await prisma.user.findMany({
      select: {
        _count: true,
        id: true,
        firstname: true,
        role: true,
      },
    });
  }

  return json(
    { success: true, data: { users, recordTypes, recordCategories } },
    httpStatus.OK
  );
};

export default function Index() {
  const openModal = useOpenModal();
  const loaderData = useLoaderData();

  return (
    <>
      <div className="flex flex-wrap justify-center gap-10">
        <Popover trigger={() => <Button size="md">New record type</Button>}>
          <CreateRecordType />
        </Popover>
        <Popover trigger={() => <Button size="md">New record category</Button>}>
          <CreateRecordCategory />
        </Popover>
        <Link to={Route.REGISTER}>
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
        <RecordTypeList items={loaderData.data?.recordTypes} />
        <RecordCategoryList items={loaderData.data?.recordCategories} />
        {loaderData.data?.users && <UserList items={loaderData.data?.users} />}
      </div>
    </>
  );
}
