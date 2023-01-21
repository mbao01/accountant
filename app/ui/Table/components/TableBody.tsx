import { flexRender } from "@tanstack/react-table";
import type { TableBodyProps } from "../types";
import { noDataClass, tableCellClass, tableRowClass } from "../classes";
import { EllipsisHorizontalIcon, InfoCircleIcon } from "~/ui/Icons";

export const TableBody = <T,>(props: TableBodyProps<T>) => {
  const { getRowModel, isLoading, noDataText } = props;
  const rows = getRowModel().rows;
  const noDataAvailable = rows.length === 0;

  return (
    <tbody>
      {isLoading ? (
        <>Loading...</>
      ) : (
        <>
          {(noDataAvailable || isLoading) && (
            <tr>
              <td colSpan={"100%" as any}>
                <div className={noDataClass}>
                  {isLoading ? (
                    <>
                      <EllipsisHorizontalIcon size="xl" /> Loading data
                    </>
                  ) : (
                    <>
                      <InfoCircleIcon size="xl" />{" "}
                      {noDataText ?? "No data here"}
                    </>
                  )}
                </div>
              </td>
            </tr>
          )}
          {!isLoading &&
            rows.map((row) => (
              <tr key={row.id} className={tableRowClass}>
                {row.getVisibleCells().map((cell) => (
                  <td key={cell.id} className={tableCellClass}>
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </td>
                ))}
              </tr>
            ))}
        </>
      )}
    </tbody>
  );
};
