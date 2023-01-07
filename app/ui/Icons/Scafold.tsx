import clsx from "clsx";
import type { SVGProps } from "./types";

export const SVG: React.FC<SVGProps> = (props) => {
  const { size = "5", value, className } = props;

  return (
    <svg
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      stroke="currentColor"
      viewBox="0 0 24 24"
      className={clsx(className, `h-${size} w-${size}`)}
    >
      {value}
    </svg>
  );
};
