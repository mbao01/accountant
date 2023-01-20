import { useLocation } from "react-router";
import { Route } from "~/routes.enum";
import type { LayoutProps } from "./types";

export const Layout = (props: LayoutProps) => {
  const { children } = props;
  const location = useLocation();

  return (
    <main className="relative h-full bg-white px-4">
      {location.pathname === Route.ROOT && <div>Root Page Header</div>}
      {children}
    </main>
  );
};
