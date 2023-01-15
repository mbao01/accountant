import { Outlet } from "@remix-run/react";

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
