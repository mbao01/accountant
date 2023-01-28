import { type ActionFunction, type LoaderFunction } from "@remix-run/node";
import httpStatus from "http-status";
import { typedjson } from "remix-typedjson";
import { redirectRequest, safeAction, validatePayload } from "~/helpers/api";
import { createRecordCategory } from "~/models/record.server";
import { CreateRecordCategoryObjectSchema } from "~/schemas/record.schema";

export const loader: LoaderFunction = redirectRequest;

export const action: ActionFunction = ({ request }) =>
  safeAction(async () => {
    let formData = await request.formData();
    const data = validatePayload(
      CreateRecordCategoryObjectSchema,
      Object.fromEntries(formData)
    );

    const res = await createRecordCategory(data);
    return typedjson({ success: true, data: res }, httpStatus.OK);
  });
