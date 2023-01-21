import type { Prisma, RecordType } from "@prisma/client";

export type RecordTypeListProps = {
  items: (Omit<RecordType, "createdAt" | "updatedAt"> & {
    _count: Prisma.RecordTypeCountOutputType;
  })[];
};
