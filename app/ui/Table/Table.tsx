import {
  getCoreRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { tableClass, tableContainerClass } from "./classes";
import { TableBody } from "./components/TableBody";
import { TableFoot } from "./components/TableFoot";
import { TableHead } from "./components/TableHead";
import type { TableProps } from "./types";

export const Table = <T,>(props: TableProps<T>) => {
  const { data, columns, showFooter, isLoading, noDataText } = props;
  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
  });

  return (
    <div className={tableContainerClass}>
      <table className={tableClass}>
        {<TableHead<T> getHeaderGroups={table.getHeaderGroups} />}
        {
          <TableBody<T>
            getRowModel={table.getRowModel}
            noDataText={noDataText}
            isLoading={isLoading}
          />
        }
        {showFooter && <TableFoot<T> getFooterGroups={table.getFooterGroups} />}
      </table>
    </div>
  );
};
