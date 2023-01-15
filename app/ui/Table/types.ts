import type {
  ColumnDef,
  CoreInstance,
  HeadersInstance,
} from "@tanstack/react-table";

export type TableProps<T> = {
  data: T[];
  columns: ColumnDef<T>[];
};

export type TableHeadProps<T> = {
  getHeaderGroups: HeadersInstance<T>["getHeaderGroups"];
};

export type TableBodyProps<T> = {
  getRowModel: CoreInstance<T>["getRowModel"];
};

export type TableFootProps<T> = {
  getFooterGroups: HeadersInstance<T>["getFooterGroups"];
};
