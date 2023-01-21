import {
  type ActionFunction,
  json,
  type LoaderFunction,
} from "@remix-run/server-runtime";
import httpStatus from "http-status";
import { prisma } from "~/db.server";
import { redirectRequest, safeAction, validatePayload } from "~/helpers/api";
import { CreateRecordTypeObjectSchema } from "~/schemas/record";

export const loader: LoaderFunction = redirectRequest;

export const action: ActionFunction = ({ request }) =>
  safeAction(async () => {
    let formData = await request.formData();
    const data = validatePayload(
      CreateRecordTypeObjectSchema,
      Object.fromEntries(formData)
    );
    const res = await prisma.recordType.create({ data });
    return json({ success: true, data: res }, httpStatus.OK);
  });
