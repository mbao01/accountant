import type { Account } from "@prisma/client";
import { Outlet, useLoaderData } from "@remix-run/react";
import { json, type LoaderFunction } from "@remix-run/server-runtime";
import { createColumnHelper } from "@tanstack/react-table";
import { useMemo } from "react";
import { prisma } from "~/db.server";
import { Table } from "~/ui/Table";

export const loader: LoaderFunction = async () => {
  const accounts = await prisma.account.findMany();
  return json({ success: true, data: accounts });
};

const AccountsIndex = () => {
  const { data: accounts } = useLoaderData<typeof loader>();

  const columns = useMemo(() => {
    const columnHelper = createColumnHelper<Account>();

    return [
      columnHelper.accessor("id", {
        id: "id",
        cell: (info) => <i>{info.getValue()}</i>,
        header: () => <span>Last Name</span>,
        footer: (info) => info.column.id,
      }),
      columnHelper.accessor("name", {
        cell: (info) => info.getValue(),
        footer: (info) => info.column.id,
      }),
      columnHelper.accessor("number", {
        header: "Number",
        cell: (info) => info.renderValue(),
        footer: (info) => info.column.id,
      }),
      columnHelper.accessor("sortCode", {
        header: "Sort code",
        footer: (info) => info.column.id,
      }),
      columnHelper.accessor("startingBalance", {
        header: "Starting balance",
        footer: (info) => info.column.id,
      }),
      columnHelper.accessor("tag", {
        header: "Tag",
        footer: (info) => info.column.id,
      }),
    ];
  }, []);

  return (
    <div>
      <h3>Accounts Index</h3>
      <Table columns={columns as any} data={accounts} />
    </div>
  );
};

export default AccountsIndex;
