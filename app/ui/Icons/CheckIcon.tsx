import { SVG } from "./SVG";
import type { IconProps } from "./types";

export const CheckIcon: React.FC<IconProps> = (props) => (
  <SVG
    {...props}
    value={
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2"
        d="M5 13l4 4L19 7"
      />
    }
  />
);
