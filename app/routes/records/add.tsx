import {
  type ActionFunction,
  json,
  type LoaderFunction,
} from "@remix-run/server-runtime";
import httpStatus from "http-status";
import { prisma } from "~/db.server";
import { redirectRequest, safeAction, validatePayload } from "~/helpers/api";
import { CreateRecordObjectSchema } from "~/schemas/record";
import { requireUserId } from "~/session.server";

export const loader: LoaderFunction = redirectRequest;

export const action: ActionFunction = ({ request }) =>
  safeAction(async () => {
    const userId = await requireUserId(request);
    const formData = await request.formData();
    const data = validatePayload(
      CreateRecordObjectSchema,
      Object.fromEntries(formData)
    );

    const res = await prisma.record.create({
      data: { ...data, createdBy: userId },
    });
    return json({ success: true, data: res }, httpStatus.OK);
  });
