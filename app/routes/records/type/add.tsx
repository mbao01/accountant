import { type RecordType } from "@prisma/client";
import { json, type ActionArgs } from "@remix-run/server-runtime";
import { redirectRequest } from "~/helpers/api";
import { prisma } from "~/db.server";

export const loader = async ({ request }: ActionArgs) =>
  redirectRequest(request);

export async function action({ request }: ActionArgs) {
  let formData = await request.formData();
  const values = Object.fromEntries(formData) as Omit<
    RecordType,
    "id" | "createdAt" | "updatedAt"
  >;
  console.log("Values: ", values);

  const res = await prisma.recordType.create({ data: values });

  console.log("Response: ", res);

  return json({ success: true, input: values, output: res }, 200);
}
