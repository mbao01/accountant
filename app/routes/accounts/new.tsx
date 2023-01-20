import type { CurrencyCode } from "@prisma/client";
import {
  type ActionFunction,
  json,
  type LoaderFunction,
} from "@remix-run/server-runtime";
import httpStatus from "http-status";
import { prisma } from "~/db.server";
import { redirectRequest, safeAction, validatePayload } from "~/helpers/api";
import { CreateAccountObjectSchema } from "~/schemas/account";
import { requireUserId } from "~/session.server";

export const loader: LoaderFunction = redirectRequest;

export const action: ActionFunction = ({ request }) =>
  safeAction(async () => {
    const userId = await requireUserId(request);
    const formData = await request.formData();
    const data = validatePayload(
      CreateAccountObjectSchema,
      Object.fromEntries(formData)
    );
    // get currencyId
    const currency = await prisma.currency.findFirst({
      where: {
        code: data.currencyId as CurrencyCode,
      },
    });

    const res = await prisma.account.create({
      data: { ...data, userId, currencyId: currency?.id! },
    });
    return json({ success: true, data: res }, httpStatus.OK);
  });
