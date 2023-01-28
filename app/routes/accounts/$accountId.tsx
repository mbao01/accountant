import { useLoaderData } from "@remix-run/react";
import { json, type LoaderArgs } from "@remix-run/server-runtime";
import { createColumnHelper } from "@tanstack/react-table";
import { useMemo } from "react";
import invariant from "tiny-invariant";
import { AddRecord } from "~/components/AddRecord";
import { formatCurrency } from "~/helpers/currency";
import { formatDate } from "~/helpers/date";
import { getAccount } from "~/models/account.server";
import { getAccountRecords } from "~/models/record.server";
import { Button } from "~/ui/Button";
import { Popover } from "~/ui/Popover";
import { Table } from "~/ui/Table";

export const loader = async ({ params }: LoaderArgs) => {
  const { accountId } = params;
  invariant(accountId, "account id required");
  const account = await getAccount(accountId);
  const records = await getAccountRecords(accountId);
  return json({ success: true as const, data: { account, records } });
};

const AccountRoute = () => {
  const { data } = useLoaderData();
  const { account, records } = data;

  const columns = useMemo(() => {
    const columnHelper = createColumnHelper<typeof records>();

    return [
      columnHelper.accessor("amount", {
        header: "Amount",
        cell: (info) => {
          const amount = info.getValue();
          const { currencyCode } = info.row.original;
          return (
            <div className="w-10">{formatCurrency(amount, currencyCode)}</div>
          );
        },
      }),
      columnHelper.accessor("Type", {
        cell: (info) => {
          const type = info.getValue();
          return <div className="flex items-center gap-2">{type.name}</div>;
        },
      }),
      columnHelper.accessor("Category", {
        cell: (info) => {
          const category = info.getValue();
          return <div className="flex items-center gap-2">{category.name}</div>;
        },
      }),
      columnHelper.accessor("note", {
        cell: (info) => {
          const note = info.getValue();
          return <div className="flex items-center gap-2">{note ?? "-"}</div>;
        },
      }),
      columnHelper.accessor("User", {
        header: "Created By",
        cell: (info) => {
          const user = info.getValue();
          return (
            <div className="flex items-center gap-2">{user.firstname}</div>
          );
        },
      }),
      columnHelper.accessor("createdAt", {
        header: "Date",
        cell: (info) => formatDate(info.getValue(), "MMM d, yyyy"),
      }),
    ];
  }, []);

  return (
    <div className="py-6 px-6">
      <div className="mb-6 flex flex-row flex-nowrap items-center justify-between">
        <div>
          <h2 className="text-xl font-semibold leading-tight">
            {account.name}
            <span className="ml-2 text-sm text-gray-500">
              ({account.number})
            </span>
          </h2>
          <div>
            {formatCurrency(account.startingBalance, account.currencyCode)}
          </div>
        </div>

        <Popover trigger={() => <Button size="sm">Add Record</Button>}>
          <AddRecord account={account} />
        </Popover>
      </div>
      <Table
        data={records}
        columns={columns as any}
        noDataText="No records to show"
      />
    </div>
  );
};

export default AccountRoute;
