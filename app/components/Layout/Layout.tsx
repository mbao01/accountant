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
            src="/accountant.png"
            alt="Accountant logo"
          />
        </div>
      )}
      <div className="px-4">{children}</div>
    </main>
  );
};
