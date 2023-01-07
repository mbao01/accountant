export type SVGProps = {
  value: JSX.Element;
  size?: "2" | "3" | "4" | "5" | "6" | "8";
  className?: string;
};

export type IconProps = Omit<SVGProps, "value">;
