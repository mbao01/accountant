import type { Prisma, RecordCategory } from "@prisma/client";

export type RecordCategoryListProps = {
  items: (Omit<RecordCategory, "createdAt" | "updatedAt" | "recordTypeId"> & {
    _count: Prisma.RecordCategoryCountOutputType;
    RecordType: {
      name: string;
    };
  })[];
};
