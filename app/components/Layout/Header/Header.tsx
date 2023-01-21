import clsx from "clsx";
import { Link, NavLink } from "react-router-dom";
import { Route } from "~/routes.enum";
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
  return (
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
      <Link to="/" className={homeLinkClass}>
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
