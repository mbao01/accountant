import { Role } from "@prisma/client";

export const ROLE_OPTIONS = [
  { label: 'Guest', value: Role.GUEST },
  { label: 'Owner', value: Role.OWNER },
  { label: 'Member', value: Role.MEMBER },
  { label: 'Admin', value: Role.ADMINISTRATOR },
] satisfies { label: string; value: Role }[];

