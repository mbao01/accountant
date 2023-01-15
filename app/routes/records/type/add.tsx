import { type RecordType } from "@prisma/client";
import {
  type ActionFunction,
  json,
  type LoaderFunction,
} from "@remix-run/server-runtime";
import httpStatus from "http-status";
import { prisma } from "~/db.server";
import { redirectRequest, safeAction } from "~/helpers/api";
import { CreateRecordTypeObjectSchema } from "~/schemas/record-type";

export const loader: LoaderFunction = ({ request }) => redirectRequest(request);

export const action: ActionFunction = ({ request }) =>
  safeAction(async () => {
    let formData = await request.formData();
    const data = Object.fromEntries(formData) as Omit<
      RecordType,
      "id" | "createdAt" | "updatedAt"
    >;

    CreateRecordTypeObjectSchema.parse(data);
    const res = await prisma.recordType.create({ data });
    return json({ success: true, data: res }, httpStatus.OK);
  });
