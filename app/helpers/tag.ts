import { TagColor, TagPattern } from "@prisma/client";
import type { TagProps } from "~/ui/Tag/types";

export const TAG_COLOR_OPTIONS = [
  {
    label: TagColor.BLUE,
    value: TagColor.BLUE,
  },
  {
    label: TagColor.GREEN,
    value: TagColor.GREEN,
  },
];

export const TAG_PATTERN_OPTIONS = [
  {
    label: TagPattern.DOTTED,
    value: TagPattern.DOTTED,
  },
  {
    label: TagPattern.CIRCLES,
    value: TagPattern.CIRCLES,
  },
];

export const TAG_LABEL = {
  [TagColor.BLUE]: "Blue",
  [TagColor.GREEN]: "Green",
  [TagPattern.DOTTED]: "Dotted",
  [TagPattern.CIRCLES]: "Circles",
} satisfies Record<TagProps['name'], string>;
