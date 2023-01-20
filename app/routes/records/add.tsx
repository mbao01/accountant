import {
  type ActionFunction,
  json,
  type LoaderFunction,
} from "@remix-run/server-runtime";
import { redirectRequest } from "~/helpers/api";

export const loader: LoaderFunction = redirectRequest;

export const action: ActionFunction = async ({ request }) => {
  let formData = await request.formData();
  const values = Object.fromEntries(formData);
  return json({ success: true, ...values }, 200);
};
