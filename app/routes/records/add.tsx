import { type ActionFunction, type LoaderFunction } from "@remix-run/node";
import httpStatus from "http-status";
import { typedjson } from "remix-typedjson";
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
    return typedjson({ success: true, data: res }, httpStatus.OK);
  });
