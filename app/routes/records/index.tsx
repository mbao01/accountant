import { useLoaderData } from "@remix-run/react";
import { json, type LoaderFunction } from "@remix-run/server-runtime";
import { createColumnHelper } from "@tanstack/react-table";
import { useMemo } from "react";
import { AddRecord } from "~/components/AddRecord";
import { formatCurrency } from "~/helpers/currency";
import { formatDate } from "~/helpers/date";
import { getRecords } from "~/models/record.server";
import { Button } from "~/ui/Button";
import { Popover } from "~/ui/Popover";
import { Table } from "~/ui/Table";

export const loader: LoaderFunction = async () => {
  const records = await getRecords();
  return json({ success: true, data: records });
};

const RecordsIndex = () => {
  const { data: records } = useLoaderData<typeof loader>();

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
      columnHelper.accessor("Account", {
        cell: (info) => {
          const account = info.getValue();
          return (
            <div className="flex flex-col text-blue-500">{account.name}</div>
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
        <h2 className="text-xl font-semibold leading-tight">Records</h2>

        <Popover trigger={() => <Button size="sm">Add Record</Button>}>
          <AddRecord />
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

export default RecordsIndex;
