import type { RecordCategory } from "@prisma/client";

export type RecordCategoryListProps = {
  items: (Omit<RecordCategory, "createdAt" | "updatedAt" | "recordTypeId"> & {
    RecordType?: {
      name: string;
    };
  })[];
};
