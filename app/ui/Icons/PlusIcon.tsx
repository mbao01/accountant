import { SVG } from "./Scafold";
import type { IconProps } from "./types";

export const PlusIcon: React.FC<IconProps> = (props) => (
  <SVG
    {...props}
    value={
      <path
        stroke-linecap="round"
        stroke-linejoin="round"
        stroke-width="2"
        d="M12 6v6m0 0v6m0-6h6m-6 0H6"
      ></path>
    }
  />
);
