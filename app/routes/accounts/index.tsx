import { Link } from "@remix-run/react";
import { createColumnHelper } from "@tanstack/react-table";
import { useMemo } from "react";
import { typedjson, useTypedLoaderData } from "remix-typedjson";
import { AddRecord } from "~/components/AddRecord";
import { formatCurrency } from "~/helpers/currency";
import { formatDate } from "~/helpers/date";
import type { ItemType } from "~/helpers/types";
import { ModalId } from "~/hooks/useModalController/types";
import { useOpenModal } from "~/hooks/useModalController/useOpenModal";
import { getAccounts } from "~/models/account.server";
import { Button } from "~/ui/Button";
import { Popover } from "~/ui/Popover";
import { Table } from "~/ui/Table";
import { Tag } from "~/ui/Tag";

export const loader = async () => {
  const accounts = await getAccounts();
  return typedjson({ success: true as const, data: accounts });
};

const AccountsIndex = () => {
  const { data: accounts } = useTypedLoaderData<typeof loader>();
  const openModal = useOpenModal();

  const columns = useMemo(() => {
    const columnHelper = createColumnHelper<ItemType<typeof accounts>>();

    return [
      columnHelper.accessor("name", {
        cell: (info) => {
          const name = info.getValue();
          const { tag, id } = info.row.original;
          return (
            <div className="flex items-center gap-2 text-gray-800">
              {tag && <Tag name={tag} />}
              <Link to={id}>{name}</Link>
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
              {sortCode && (
                <span className="text-xs text-gray-500">{sortCode}</span>
              )}
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
        cell: (info) => formatDate(info.getValue(), "MMM d, yyyy"),
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
        data={accounts}
        columns={columns as any}
        noDataText="No accounts available"
      />
    </div>
  );
};

export default AccountsIndex;
