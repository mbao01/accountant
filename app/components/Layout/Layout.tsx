import { useLocation } from "react-router";
import { Route } from "~/routes.enum";
import { Button } from "~/ui/Button";
import { ArrowRightOnRectangleIcon } from "~/ui/Icons";
import { Header } from "./Header";
import type { LayoutProps } from "./types";

export const Layout = (props: LayoutProps) => {
  const { children, user } = props;
  const location = useLocation();

  return (
    <main className="relative h-full bg-white">
      {user && (
        <div className="mb-6">
          {location.pathname === Route.ROOT ? (
            <div className="flex flex-col items-center justify-center pt-20 pb-6">
              <div className="relative mb-2 text-lg">
                {user.firstname}
                <span className="absolute inline-flex h-2 w-2 animate-ping rounded-full bg-green-400 opacity-75" />
                <span className="absolute inline-flex h-2 w-2 rounded-full bg-green-500" />
              </div>
              <Button
                size="sm"
                outline
                className="flex h-5 w-5 items-center justify-center rounded-full px-0"
              >
                <ArrowRightOnRectangleIcon />
              </Button>
            </div>
          ) : (
            <Header title={user.firstname} />
          )}
        </div>
      )}
      <div className="px-4">{children}</div>
    </main>
  );
};
