import { SVG } from "./SVG";
import type { IconProps } from "./types";

export const ChevronUpDownIcon: React.FC<IconProps> = (props) => (
  <SVG
    {...props}
    value={
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2"
        d="M16 16l-4 4-4-4 M8 8l4-4 4 4"
      />
    }
  />
);
