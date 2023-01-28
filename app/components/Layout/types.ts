import type { User } from "@prisma/client";
import type { ReactNode } from "react";

export type LayoutProps = {
  user: User | null;
  children: ReactNode;
};
