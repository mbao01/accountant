import { flexRender } from "@tanstack/react-table";
import type { TableFootProps } from "../types";

export const TableFoot = <T,>(props: TableFootProps<T>) => {
  const { getFooterGroups } = props;
  return (
    <thead>
      {getFooterGroups().map((footerGroup) => (
        <tr key={footerGroup.id}>
          {footerGroup.headers.map((header) => (
            <th key={header.id}>
              {header.isPlaceholder
                ? null
                : flexRender(
                    header.column.columnDef.footer,
                    header.getContext()
                  )}
            </th>
          ))}
        </tr>
      ))}
    </thead>
  );
};
