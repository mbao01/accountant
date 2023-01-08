import type { TSize } from "../types";

export const SVGClass = "min-w-min";

export const SVGSizes = {
    lg: 'h-5 w-5',
    md: 'h-4 w-4',
    sm: 'h-3.5 w-3.5',
} satisfies Record<TSize, string>;