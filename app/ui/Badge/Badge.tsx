import type { BadgeProps } from "./types";

export const Badge: React.FC<BadgeProps> = (props) => {
  const { color, value, size = "xs" } = props;
  return (
    <span
      className={`bg-${color}-200 text-${color}-900 rounded-full px-2 text-${size}`}
    >
      {value}
    </span>
  );
};
