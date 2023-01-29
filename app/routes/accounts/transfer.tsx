import { type ActionFunction, type LoaderFunction } from "@remix-run/node";
import httpStatus from "http-status";
import { typedjson } from "remix-typedjson";
import { redirectRequest, safeAction, validatePayload } from "~/helpers/api";
import { makeAccountTransfer } from "~/models/account.server";
import { CreateTransferObjectSchema } from "~/schemas/record.schema";

export const loader: LoaderFunction = redirectRequest;

export const action: ActionFunction = ({ request }) =>
  safeAction(async () => {
    const formData = await request.formData();
    const data = validatePayload(
      CreateTransferObjectSchema,
      Object.fromEntries(formData)
    );

    const transfer = await makeAccountTransfer(request, data);
    return typedjson({ success: true, data: transfer }, httpStatus.OK);
  });
