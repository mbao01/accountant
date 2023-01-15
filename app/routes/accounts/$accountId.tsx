import { useLoaderData } from "@remix-run/react";
import { json, type LoaderFunction } from "@remix-run/server-runtime";
import httpStatus from "http-status";
import { prisma } from "~/db.server";

export const loader: LoaderFunction = async ({ params }) => {
  try {
    const { accountId } = params;
    const account = await prisma.account.findUniqueOrThrow({
      where: { id: accountId },
    });
    return json({ success: true, data: account });
  } catch (e: any) {
    const { name, code } = e;
    return json(
      {
        success: false,
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
