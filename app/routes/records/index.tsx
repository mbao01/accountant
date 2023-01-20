import type { Account, Record } from "@prisma/client";
import { useLoaderData } from "@remix-run/react";
import { json, type LoaderFunction } from "@remix-run/server-runtime";
import { createColumnHelper } from "@tanstack/react-table";
import { useMemo } from "react";
import { AddRecord } from "~/components/AddRecord";
import { prisma } from "~/db.server";
import { formatCurrency } from "~/helpers/currency";
import { formatDate } from "~/helpers/date";
import { Button } from "~/ui/Button";
import { Popover } from "~/ui/Popover";
import { Table } from "~/ui/Table";

export const loader: LoaderFunction = async () => {
  const records = await prisma.record.findMany({
    select: {
      account: {
        select: {
          name: true,
        },
      },
    },
  });
  return json({ success: true, data: records });
};

const RecordsIndex = () => {
  const { data: records } = useLoaderData<typeof loader>();

  const columns = useMemo(() => {
    const columnHelper = createColumnHelper<Record & { account: Account }>();

    return [
      columnHelper.accessor("amount", {
        header: "Amount",
        cell: (info) => {
          const amount = info.getValue();
          const { currency } = info.row.original;
          return <div className="w-10">{formatCurrency(amount, currency)}</div>;
        },
      }),
      columnHelper.accessor("note", {
        cell: (info) => {
          const note = info.getValue();
          return <div className="flex items-center gap-2">{note}</div>;
        },
      }),
      columnHelper.accessor("account", {
        header: "Number",
        cell: (info) => {
          const account = info.getValue();
          return (
            <div className="flex flex-col text-blue-500">{account.name}</div>
          );
        },
      }),
      columnHelper.accessor("createdAt", {
        header: "Created",
        cell: (info) => formatDate(info.getValue()),
      }),
    ];
  }, []);

  return (
    <div className="py-6 px-6">
      <div className="mb-6 flex flex-row flex-nowrap items-center justify-between">
        <h2 className="text-xl font-semibold leading-tight">Records</h2>

        <Popover trigger={() => <Button size="sm">Add Record</Button>}>
          <AddRecord />
        </Popover>
      </div>
      <Table columns={columns as any} data={records} />
    </div>
  );
};

export default RecordsIndex;
