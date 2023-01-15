import { useParams } from "@remix-run/react";

export const loader = () => {
  return null;
};

const Account = () => {
  const { accountId } = useParams();
  return <div>Account {accountId}</div>;
};

export default Account;
