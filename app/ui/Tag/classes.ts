import { TagPattern } from '@prisma/client';
import { TagColor } from '@prisma/client';
import type { TagProps } from "./types";

export const tagContainerClass = "flex flex-row items-center flex-nowrap gap-1.5";

export const tagClass = "w-4 h-4 rounded-full border border-gray-200 capitalize";

export const tagTypeClasses = {
    [TagColor.BLUE]: "bg-blue-700",
    [TagColor.GREEN]: "bg-green-700",
    [TagPattern.DOTTED]: "",
    [TagPattern.CIRCLES]: "",
} satisfies Record<TagProps['name'], string>;

export const tagLabelClass = "";
