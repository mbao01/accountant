import clsx from "clsx";
import { Link, NavLink, useLocation } from "react-router-dom";
import { Route } from "~/routes.enum";
import { Button } from "~/ui/Button";
import { ArrowRightOnRectangleIcon } from "~/ui/Icons";
import {
  activeNavLinkClass,
  headerClass,
  homeLinkClass,
  logoClass,
  logOutLinkClass,
  navClass,
  navLinkClass,
} from "./classes";
import type { HeaderProps } from "./types";

const NAV_LINKS = [
  {
    to: Route.ACCOUNTS,
    title: "Accounts",
  },
  {
    to: Route.RECORDS,
    title: "Records",
  },
];

export const Header: React.FC<HeaderProps> = ({ title }) => {
  const location = useLocation();

  return location.pathname === Route.ROOT ? (
    <header className="flex flex-col items-center justify-center pt-28 pb-6">
      <img
        className={logoClass}
        src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600"
        alt="Accountant logo"
      />
      <div className="relative mb-2 text-lg">
        {title}
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
      <nav className={clsx(navClass, "py-10")}>
        {NAV_LINKS.map(({ to, title }) => (
          <NavLink
            to={to}
            key={to}
            className={({ isActive }) =>
              clsx(navLinkClass, {
                [activeNavLinkClass]: isActive,
              })
            }
          >
            {title}
          </NavLink>
        ))}
      </nav>
    </header>
  ) : (
    <header className={headerClass}>
      <nav className={navClass}>
        {NAV_LINKS.map(({ to, title }) => (
          <NavLink
            to={to}
            key={to}
            className={({ isActive }) =>
              clsx(navLinkClass, {
                [activeNavLinkClass]: isActive,
              })
            }
          >
            {title}
          </NavLink>
        ))}
      </nav>
      <Link to={Route.ROOT} className={homeLinkClass}>
        <img
          className={logoClass}
          src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600"
          alt="Accountant logo"
        />
        <span className="">{title}</span>
      </Link>
      <Link to={Route.LOGOUT} className={logOutLinkClass}>
        Log out
        <ArrowRightOnRectangleIcon />
      </Link>
    </header>
  );
};
