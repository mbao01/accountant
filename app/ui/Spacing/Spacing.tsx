import type { SpacingProps } from "./types";

export const Spacing: React.FC<SpacingProps> = ({ size = "2" }) => {
  return <div className={`h-${size}`} />;
};
