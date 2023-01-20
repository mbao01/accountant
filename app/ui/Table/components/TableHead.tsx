import { flexRender } from "@tanstack/react-table";
import type { TableHeadProps } from "../types";
import { tableHeaderClass } from "../classes";

export const TableHead = <T,>(props: TableHeadProps<T>) => {
  const { getHeaderGroups } = props;
  return (
    <thead>
      {getHeaderGroups().map((headerGroup) => (
        <tr key={headerGroup.id}>
          {headerGroup.headers.map((header) => (
            <th key={header.id} className={tableHeaderClass}>
              {header.isPlaceholder
                ? null
                : flexRender(
                    header.column.columnDef.header,
                    header.getContext()
                  )}
            </th>
          ))}
        </tr>
      ))}
    </thead>
  );
};
