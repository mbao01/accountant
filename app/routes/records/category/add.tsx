import { type RecordCategory } from "@prisma/client";
import {
  type ActionFunction,
  json,
  type LoaderFunction,
} from "@remix-run/server-runtime";
import httpStatus from "http-status";
import { prisma } from "~/db.server";
import { redirectRequest, safeAction } from "~/helpers/api";
import { CreateRecordCategoryObjectSchema } from "~/schemas/record-category";

export const loader: LoaderFunction = ({ request }) => redirectRequest(request);

export const action: ActionFunction = ({ request }) =>
  safeAction(async () => {
    let formData = await request.formData();
    const data = Object.fromEntries(formData) as Omit<
      RecordCategory,
      "id" | "createdAt" | "updatedAt"
    >;

    CreateRecordCategoryObjectSchema.parse(data);
    const res = await prisma.recordCategory.create({ data });
    return json({ success: true, data: res }, httpStatus.OK);
  });
