import { useLoaderData } from "@remix-run/react";
import { json, type LoaderFunction } from "@remix-run/server-runtime";
import { createColumnHelper } from "@tanstack/react-table";
import { useMemo } from "react";
import { AddRecord } from "~/components/AddRecord";
import { prisma } from "~/db.server";
import { formatCurrency } from "~/helpers/currency";
import { formatDate } from "~/helpers/date";
import { ModalId } from "~/hooks/useModalController/types";
import { useOpenModal } from "~/hooks/useModalController/useOpenModal";
import { Button } from "~/ui/Button";
import { Popover } from "~/ui/Popover";
import { Table } from "~/ui/Table";
import { Tag } from "~/ui/Tag";

export const loader: LoaderFunction = async () => {
  const accounts = await prisma.account.findMany({
    select: {
      tag: true,
      _count: true,
      name: true,
      number: true,
      sortCode: true,
      createdAt: true,
      startingBalance: true,
      Currency: { select: { code: true } },
      User: { select: { firstname: true } },
    },
  });
  return json({ success: true, data: accounts });
};

const AccountsIndex = () => {
  const { data: accounts } = useLoaderData<typeof loader>();
  const openModal = useOpenModal();

  const columns = useMemo(() => {
    const columnHelper = createColumnHelper<typeof accounts>();

    return [
      columnHelper.accessor("name", {
        cell: (info) => {
          const name = info.getValue();
          const { tag } = info.row.original;
          return (
            <div className="flex items-center gap-2 text-gray-800">
              {tag && <Tag name={tag} />}
              {name}
            </div>
          );
        },
      }),
      columnHelper.accessor("number", {
        header: "Number",
        cell: (info) => {
          const number = info.getValue();
          const { sortCode } = info.row.original;
          return (
            <div className="flex flex-col">
              {number}
              {sortCode && <span className="text-xs text-gray-500">{sortCode}</span>}
            </div>
          );
        },
      }),
      columnHelper.accessor("startingBalance", {
        header: "Opening balance",
        cell: (info) => {
          const startingBalance = info.getValue();
          const { Currency } = info.row.original;
          return formatCurrency(startingBalance, Currency.code);
        },
      }),
      columnHelper.accessor((info) => info._count.Record, {
        header: "Records",
      }),
      columnHelper.accessor((info) => info.User.firstname, {
        header: "Owner",
      }),
      columnHelper.accessor("createdAt", {
        header: "Created",
        cell: (info) => formatDate(info.getValue(), 'MMM d, yyyy'),
      }),
    ];
  }, []);

  return (
    <div className="py-6 px-6">
      <div className="mb-6 flex flex-row flex-nowrap items-center justify-between">
        <h2 className="text-xl font-semibold leading-tight">Accounts</h2>
        <div className="flex gap-6">
          <Button
            outline
            size="sm"
            onClick={() => openModal(ModalId.CREATE_ACCOUNT)}
          >
            Create Account
          </Button>
          <Popover trigger={() => <Button size="sm">Add Record</Button>}>
            <AddRecord />
          </Popover>
        </div>
      </div>
      <Table
        columns={columns as any}
        data={accounts}
        noDataText="No accounts available"
      />
    </div>
  );
};

export default AccountsIndex;
