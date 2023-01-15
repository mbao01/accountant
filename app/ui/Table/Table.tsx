import { getCoreRowModel, useReactTable } from "@tanstack/react-table";
import { TableBody } from "./components/TableBody";
import { TableFoot } from "./components/TableFoot";
import { TableHead } from "./components/TableHead";
import type { TableProps } from "./types";

export const Table = <T,>(props: TableProps<T>) => {
  const { data, columns } = props;
  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  return (
    <div className="container mx-auto px-4 sm:px-8">
      <div className="py-8">
        <div>
          <h2 className="text-2xl font-semibold leading-tight">Invoices</h2>
        </div>
        <div className="-mx-4 overflow-x-auto px-4 py-4 sm:-mx-8 sm:px-8">
          <div className="inline-block min-w-full overflow-hidden rounded-lg shadow-md">
            <table className="min-w-full leading-normal">
              {<TableHead<T> getHeaderGroups={table.getHeaderGroups} />}
              {<TableBody<T> getRowModel={table.getRowModel} />}
              {<TableFoot<T> getFooterGroups={table.getFooterGroups} />}
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};
