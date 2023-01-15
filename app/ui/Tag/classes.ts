import { TagPattern } from '@prisma/client';
import { TagColor } from '@prisma/client';
import type { TSize } from '../types';
import type { TagProps } from "./types";

export const tagContainerClass = "flex flex-row items-center flex-nowrap gap-1.5";

export const tagClass = "w-4 h-4 rounded-full border border-gray-200 capitalize";

export const tagTypeClasses = {
  [TagColor.RED]: "bg-red-700",
  [TagColor.BLUE]: "bg-blue-700",
  [TagColor.GRAY]: "bg-gray-500",
  [TagColor.PINK]: "",
  [TagColor.PUCE]: "",
  [TagColor.BROWN]: "",
  [TagColor.GREEN]: "bg-green-700",
  [TagColor.SMALT]: "",
  [TagColor.BISQUE]: "",
  [TagColor.DAMASK]: "",
  [TagColor.JASPER]: "",
  [TagColor.ORANGE]: "bg-yellow-700",
  [TagColor.PURPLE]: "bg-purple-700",
  [TagColor.TITIAN]: "",
  [TagColor.VIOLET]: "",
  [TagColor.YELLOW]: "bg-yellow-400",
  [TagColor.CATTLEYA]: "",
  [TagColor.BITTERSWEET]: "",
  [TagPattern.WAVY]: "",
  [TagPattern.OMBRE]: "",
  [TagPattern.PLAID]: "",
  [TagPattern.DOTTED]: "",
  [TagPattern.FLORAL]: "",
  [TagPattern.ZIGZAG]: "",
  [TagPattern.CHEVRON]: "",
  [TagPattern.CIRCLES]: "",
  [TagPattern.DIAMOND]: "",
  [TagPattern.LATTICE]: "",
  [TagPattern.PAISLEY]: "",
  [TagPattern.ROUNDED]: "",
  [TagPattern.STRIPED]: "",
  [TagPattern.GEOMETRIC]: "",
  [TagPattern.BASKETWEAVE]: ""
} satisfies Record<TagProps['name'], string>;

export const tagLabelClass = "";

export const labelClass = {
    lg: "text-sm",
    md: "text-sm",
    sm: "text-xs",
  } satisfies Record<TSize, string>;