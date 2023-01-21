import { Header } from "./Header";
import { logoClass } from "./Header/classes";
import type { LayoutProps } from "./types";

export const Layout = (props: LayoutProps) => {
  const { children, user } = props;

  return (
    <main className="relative h-full bg-white">
      {user ? (
        <Header title={user.firstname} />
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
