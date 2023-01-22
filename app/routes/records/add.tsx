import {
  type ActionFunction,
  json,
  type LoaderFunction,
} from "@remix-run/server-runtime";
import httpStatus from "http-status";
import { redirectRequest, safeAction, validatePayload } from "~/helpers/api";
import { createRecord } from "~/models/record.server";
import { CreateRecordObjectSchema } from "~/schemas/record.schema";

export const loader: LoaderFunction = redirectRequest;

export const action: ActionFunction = ({ request }) =>
  safeAction(async () => {
    const formData = await request.formData();
    const data = validatePayload(
      CreateRecordObjectSchema,
      Object.fromEntries(formData)
    );

    const res = await createRecord(request, data);
    return json({ success: true, data: res }, httpStatus.OK);
  });
