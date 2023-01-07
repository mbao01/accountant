import { SVG } from "./SVG";
import type { IconProps } from "./types";

export const ChevronDown: React.FC<IconProps> = (props) => (
  <SVG
    {...props}
    value={
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2"
        d="M19 9l-7 7-7-7"
      />
    }
  />
);
