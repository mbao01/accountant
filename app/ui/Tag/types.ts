import type { TagColor, TagPattern } from "@prisma/client";

export type TagProps = {
  name: TagColor | TagPattern;
  full?: boolean;
};
