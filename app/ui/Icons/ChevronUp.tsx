import { SVG } from "./SVG";
import type { IconProps } from "./types";

export const ChevronUp: React.FC<IconProps> = (props) => (
  <SVG
    {...props}
    value={
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2"
        d="M5 15l7-7 7 7"
      />
    }
  />
);
