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
    include: {
      currency: true,
      user: true,
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
            <div className="flex items-center gap-2">
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
            <div className="flex flex-col text-blue-500">
              {number}
              {sortCode && <span className="text-xs">{sortCode}</span>}
            </div>
          );
        },
      }),
      columnHelper.accessor("startingBalance", {
        header: "Opening balance",
        cell: (info) => {
          const startingBalance = info.getValue();
          const { currency } = info.row.original;
          return (
            <div className="w-10">
              {formatCurrency(startingBalance, currency.code)}
            </div>
          );
        },
      }),
      columnHelper.accessor((info) => info.user.email, {
        header: "Owner",
      }),
      columnHelper.accessor("createdAt", {
        header: "Created",
        cell: (info) => formatDate(info.getValue()),
      }),
    ];
  }, []);

  return (
    <>
      <div className="py-6 px-6">
        <div className="mb-6 flex flex-row flex-nowrap items-center justify-between">
          <h2 className="text-xl font-semibold leading-tight">Accounts</h2>
          <div className="flex gap-6">
            <Button
              outline
              size="sm"
              onClick={() => openModal(ModalId.CREATE_ACCOUNT)}
            >
              Create
            </Button>
            <Popover trigger={() => <Button size="sm">Add Record</Button>}>
              <AddRecord />
            </Popover>
          </div>
        </div>
        <Table columns={columns as any} data={accounts} />
      </div>
    </>
  );
};

export default AccountsIndex;
