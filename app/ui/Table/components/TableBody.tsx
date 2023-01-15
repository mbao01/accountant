import { flexRender } from "@tanstack/react-table";
import type { TableBodyProps } from "../types";

export const TableBody = <T,>(props: TableBodyProps<T>) => {
  const { getRowModel } = props;
  return (
    <tbody>
      {getRowModel().rows.map((row) => (
        <tr key={row.id}>
          {row.getVisibleCells().map((cell) => (
            <td
              key={cell.id}
              className="border-b border-gray-200 bg-white px-5 py-5 text-sm"
            >
              {flexRender(cell.column.columnDef.cell, cell.getContext())}
            </td>
          ))}
        </tr>
      ))}
    </tbody>
  );
};
