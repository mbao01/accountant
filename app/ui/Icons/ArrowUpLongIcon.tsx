import { SVG } from "./SVG";
import type { IconProps } from "./types";

export const ArrowUpLongIcon: React.FC<IconProps> = (props) => (
  <SVG
    {...props}
    value={
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M15.75 17.25L12 21m0 0l-3.75-3.75M12 21V3"
      />
    }
  />
);
