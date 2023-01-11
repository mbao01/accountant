import type { TagColor, TagPattern } from "@prisma/client";
import type { TSize } from "../types";

export type TagProps = {
  name: TagColor | TagPattern;
  full?: boolean;
  size?: TSize;
};
