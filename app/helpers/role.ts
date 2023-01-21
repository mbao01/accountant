import { Role } from "@prisma/client";

export const ROLE_MAP = {
  [Role.GUEST]: "Guest",
  [Role.OWNER]: "Owner",
  [Role.MEMBER]: "Member",
  [Role.ADMINISTRATOR]: "Admin",
} satisfies Record<Role, string>;

export const ROLE_OPTIONS = [
  { value: Role.GUEST, label: ROLE_MAP[Role.GUEST] },
  { value: Role.OWNER, label: ROLE_MAP[Role.OWNER] },
  { value: Role.MEMBER, label: ROLE_MAP[Role.MEMBER] },
  { value: Role.ADMINISTRATOR, label: ROLE_MAP[Role.ADMINISTRATOR] },
] satisfies { label: string; value: Role }[];

