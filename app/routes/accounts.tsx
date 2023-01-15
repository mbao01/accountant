import { Outlet } from "@remix-run/react";

export const loader = () => {
  return null;
};

const Accounts = () => {
  return (
    <div>
      <h3>Accounts</h3>
      <div>
        <Outlet />
      </div>
    </div>
  );
};

export default Accounts;
