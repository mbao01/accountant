import { json, type ActionArgs } from "@remix-run/server-runtime";
import { redirectRequest } from "~/helpers/api";

export const loader = async ({ request }: ActionArgs) =>
  redirectRequest(request);

export async function action({ request }: ActionArgs) {
  let formData = await request.formData();
  const values = Object.fromEntries(formData);
  return json({ success: true, ...values }, 200);
}
