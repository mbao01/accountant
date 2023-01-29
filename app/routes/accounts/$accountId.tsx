import type { TagColor } from "@prisma/client";
import { type LoaderArgs } from "@remix-run/node";
import { createColumnHelper } from "@tanstack/react-table";
import { useMemo } from "react";
import { typedjson, useTypedLoaderData } from "remix-typedjson";
import invariant from "tiny-invariant";
import type { ItemType } from "~/helpers/types";
import { AddRecord } from "~/components/AddRecord";
import { formatCurrency } from "~/helpers/currency";
import { formatDate } from "~/helpers/date";
import { TAG_LABEL } from "~/helpers/tag";
import { getAccountAnalytics } from "~/models/account.server";
import { Button } from "~/ui/Button";
import { Popover } from "~/ui/Popover";
import { Table } from "~/ui/Table";
import { AccountTransfer } from "~/components/AccountTransfer";

export const loader = async ({ params }: LoaderArgs) => {
  const { accountId } = params;
  invariant(accountId, "account id required");
  const { account, records, balance, aggregate } = await getAccountAnalytics(
    accountId
  );
  return typedjson({
    success: true as const,
    data: { account, records, balance, aggregate },
  });
};

const Detail = ({
  title,
  value,
  footer,
  tag,
}: {
  tag: TagColor | null;
  title: string;
  value: string;
  footer: string;
}) => {
  const color = (tag ? TAG_LABEL[tag] : TAG_LABEL.GRAY).toLowerCase();
  return (
    <div
      className={`relative flex h-28 w-52 flex-col overflow-hidden rounded bg-gray-100 px-5 pt-4 pb-2 shadow shadow-gray-200`}
    >
      <h6 className="text-xs uppercase text-gray-500">{title}</h6>
      <div className={`my-1 text-2xl text-${color}-800`}>{value}</div>
      <div className="mt-auto text-sm text-gray-500">{footer}</div>
      <span
        className={`bg-${color}-600 absolute top-0 left-0 block h-1.5 w-full`}
      />
    </div>
  );
};

const AccountRoute = () => {
  const { data } = useTypedLoaderData<typeof loader>();
  const { account, records, aggregate, balance } = data;

  const columns = useMemo(() => {
    const columnHelper = createColumnHelper<ItemType<typeof records>>();

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
        <div className="w-68 relative flex h-28 flex-col justify-between gap-2 overflow-hidden rounded bg-gray-100 px-5 pt-4 pb-2 shadow shadow-gray-200">
          <span className="absolute top-0 left-0 block h-full w-1.5 bg-purple-600" />
          <h5 className="text-lg leading-none">
            {account.name}{" "}
            <span className="text-sm text-gray-500">({account.number})</span>
          </h5>
          <div className="align-center flex flex-wrap gap-x-4 gap-y-2 rounded bg-gray-100">
            <span className="text-xs text-gray-500">
              Starting balance of <br />
              <span className="text-sm text-gray-900">
                {formatCurrency(account.startingBalance, account.Currency.code)}
              </span>
            </span>
            <span className="text-xs text-gray-500">
              Current balance is <br />
              <span className="text-sm text-gray-900">
                {formatCurrency(balance, account.Currency.code)}
              </span>
            </span>
          </div>
        </div>
        <div className="flex gap-12">
          {Object.values(aggregate).map(({ $sum, $max, recordType }) => {
            return (
              <Detail
                key={recordType.id}
                tag={recordType.tag}
                title={recordType.name}
                value={formatCurrency($sum, account.Currency.code)}
                footer={`Highest ${formatCurrency(
                  $max,
                  account.Currency.code
                )}`}
              />
            );
          })}
        </div>
      </div>
      <div className="mb-4 flex justify-end gap-6">
        <Popover
          trigger={() => (
            <Button size="sm" outline>
              Transfer
            </Button>
          )}
        >
          <AccountTransfer fromAccount={account} />
        </Popover>
        <Popover trigger={() => <Button size="sm">Add Record</Button>}>
          <AddRecord account={account} />
        </Popover>
      </div>
      <Table data={records} columns={columns} noDataText="No records to show" />
    </div>
  );
};

export default AccountRoute;
