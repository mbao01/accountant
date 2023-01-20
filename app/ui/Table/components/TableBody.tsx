import { flexRender } from "@tanstack/react-table";
import type { TableBodyProps } from "../types";
import { tableCellClass, tableRowClass } from "../classes";

export const TableBody = <T,>(props: TableBodyProps<T>) => {
  const { getRowModel } = props;
  return (
    <tbody>
      {getRowModel().rows.map((row) => (
        <tr key={row.id} className={tableRowClass}>
          {row.getVisibleCells().map((cell) => (
            <td key={cell.id} className={tableCellClass}>
              {flexRender(cell.column.columnDef.cell, cell.getContext())}
            </td>
          ))}
        </tr>
      ))}
    </tbody>
  );
};
