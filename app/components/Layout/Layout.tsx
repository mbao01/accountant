import { useLocation } from "react-router";
import { Route } from "~/routes.enum";
import type { LayoutProps } from "./types";

export const Layout = (props: LayoutProps) => {
  const { children } = props;
  const location = useLocation();

  return (
    <main className="relative bg-white">
      {location.pathname === Route.ROOT && <div>AAAA</div>}
      {children}
    </main>
  );
};
