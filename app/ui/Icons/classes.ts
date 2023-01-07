import type { TSize } from "../types";

export const SVGSizes = {
    lg: 'h-6 w-6',
    md: 'h-5 w-5',
    sm: 'h-4 h-4',
} satisfies Record<TSize, string>;