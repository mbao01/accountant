import type {
  ColumnDef,
  CoreInstance,
  HeadersInstance,
} from "@tanstack/react-table";

export type TableProps<T> = {
  data: T[];
  columns: ColumnDef<T>[];
  isLoading?: boolean;
  showFooter?: boolean;
  noDataText?: string;
};

export type TableHeadProps<T> = {
  getHeaderGroups: HeadersInstance<T>["getHeaderGroups"];
};

export type TableBodyProps<T> = {
  getRowModel: CoreInstance<T>["getRowModel"];
  isLoading?: boolean;
  noDataText?: string;
};

export type TableFootProps<T> = {
  getFooterGroups: HeadersInstance<T>["getFooterGroups"];
};
