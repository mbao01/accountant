import type { LayoutProps } from "./types";

export const Layout = (props: LayoutProps) => {
  const { children } = props;
  return <main className="relative bg-white">{children}</main>;
};
