import { useLoaderData } from "@remix-run/react";
import { json, type LoaderArgs } from "@remix-run/server-runtime";
import httpStatus from "http-status";
import { getAccount } from "~/models/account.server";

export const loader = async ({ params }: LoaderArgs) => {
  try {
    const { accountId = "" } = params;
    const account = await getAccount(accountId);
    return json({ success: true as const, data: account });
  } catch (e: any) {
    const { name, code } = e;
    return json(
      {
        success: false as const,
        error: { name, code, message: "No account found", stack: e },
      },
      httpStatus.NOT_FOUND
    );
  }
};

const Account = () => {
  const data = useLoaderData<typeof loader>();
  return (
    <div>
      Account
      <pre>{JSON.stringify(data, null, 2)}</pre>
    </div>
  );
};

export default Account;
