import { Outlet } from "@remix-run/react";
import { Layout } from "~/components/Layout";

const Records = () => {
  return (
    <Layout>
      <Outlet />
    </Layout>
  );
};

export default Records;
