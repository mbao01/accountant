import type { ShimmerProps } from "./types";

export const Shimmer: React.FC<ShimmerProps> = (props) => {
  const { width = "full", height = "4", spacing = "6" } = props;
  return (
    <div
      className={`animate-pulse rounded-sm bg-gray-200 w-${width} min-w-min h-${height} min-h-min my-${spacing}`}
    />
  );
};
