import { useLocation } from "react-router";
import { Link } from "react-router-dom";
import { Route } from "~/routes.enum";
import { Button } from "~/ui/Button";
import { ArrowRightOnRectangleIcon } from "~/ui/Icons";
import { Header } from "./Header";
import { logoClass } from "./Header/classes";
import type { LayoutProps } from "./types";

export const Layout = (props: LayoutProps) => {
  const { children, user } = props;
  const location = useLocation();

  return (
    <main className="relative h-full bg-white">
      {user ? (
        <div className="mb-6">
          {location.pathname === Route.ROOT ? (
            <div className="flex flex-col items-center justify-center pt-28 pb-6">
              <div className="relative mb-2 text-lg">
                {user.firstname}
                <span className="absolute inline-flex h-2 w-2 animate-ping rounded-full bg-green-400 opacity-75" />
                <span className="absolute inline-flex h-2 w-2 rounded-full bg-green-500" />
              </div>
              <Link to={Route.LOGOUT}>
                <Button
                  size="sm"
                  outline
                  className="flex h-5 w-5 items-center justify-center rounded-full px-0"
                >
                  <ArrowRightOnRectangleIcon />
                </Button>
              </Link>
            </div>
          ) : (
            <Header title={user.firstname} />
          )}
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center pt-28 pb-6">
          <img
            className={logoClass}
            src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600"
            alt="Accountant logo"
          />
        </div>
      )}
      <div className="px-4">{children}</div>
    </main>
  );
};
