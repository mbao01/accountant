import { flexRender } from "@tanstack/react-table";
import type { TableHeadProps } from "../types";
import { tableHeaderClass } from "../classes";
import { ChevronUpDownIcon } from "~/ui/Icons";
import { ArrowUpLongIcon } from "~/ui/Icons/ArrowUpLongIcon";
import { ArrowDownLongIcon } from "~/ui/Icons/ArrowDownLongIcon";

export const TableHead = <T,>(props: TableHeadProps<T>) => {
  const { getHeaderGroups } = props;
  return (
    <thead>
      {getHeaderGroups().map((headerGroup) => (
        <tr key={headerGroup.id}>
          {headerGroup.headers.map((header) => {
            const isSortable = header.column.getCanSort();
            const isSorted = header.column.getIsSorted();
            const content = flexRender(
              header.column.columnDef.header,
              header.getContext()
            );
            return (
              <th key={header.id} className={tableHeaderClass}>
                {header.isPlaceholder ? null : isSortable ? (
                  <button
                    type="button"
                    className="flex select-none flex-nowrap gap-1 uppercase"
                    onClick={header.column.getToggleSortingHandler()}
                  >
                    {content}
                    {
                      {
                        asc: <ArrowUpLongIcon />,
                        desc: <ArrowDownLongIcon />,
                        default: (
                          <ChevronUpDownIcon className="invisible opacity-0 transition group-hover:visible group-hover:opacity-100" />
                        ),
                      }[isSorted || "default"]
                    }
                  </button>
                ) : (
                  content
                )}
              </th>
            );
          })}
        </tr>
      ))}
    </thead>
  );
};
