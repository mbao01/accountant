import {
  type ActionFunction,
  json,
  type LoaderFunction,
} from "@remix-run/server-runtime";
import httpStatus from "http-status";
import { redirectRequest, safeAction, validatePayload } from "~/helpers/api";
import { createAccount } from "~/models/account.server";
import { CreateAccountObjectSchema } from "~/schemas/account";

export const loader: LoaderFunction = redirectRequest;

export const action: ActionFunction = ({ request }) =>
  safeAction(async () => {
    const formData = await request.formData();
    const data = validatePayload(
      CreateAccountObjectSchema,
      Object.fromEntries(formData)
    );

    const res = await createAccount(request, data);
    return json({ success: true, data: res }, httpStatus.OK);
  });
