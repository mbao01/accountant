import { PrismaClientValidationError } from "@prisma/client/runtime";
import { type ActionArgs, redirect, json } from "@remix-run/server-runtime";
import { type AnyZodObject, type z, ZodError } from "zod";
import httpStatus, { type HttpStatus } from "http-status";
import type { TServerError } from "./types";

export const redirectRequest = ({ request }: ActionArgs) => {
  const url = new URL(request.url);
  const params = new URLSearchParams(url.search);
  const redirectUrl = params.get("redirect") ?? "/";
  params.delete("redirect"); // delete redirect path

  const fullRedirectUrl = `${redirectUrl}?${params.toString()}`;
  return redirect(fullRedirectUrl);
};

export const handleError = (error: TServerError) => {
  const { message, name, stack } = error;
  let status: keyof HttpStatus = httpStatus.INTERNAL_SERVER_ERROR;
  if (error instanceof ZodError || error instanceof TypeError) {
    status = httpStatus.BAD_REQUEST;
  } else if (error instanceof PrismaClientValidationError) {
    status = httpStatus.NOT_ACCEPTABLE;
  }

  return {
    error: { message, name, stack },
    status,
    success: false,
  };
};

export const safeAction = async (callback: () => Promise<unknown>) => {
  try {
    return await callback();
  } catch (e: any) {
    const res = handleError(e);
    return json(res, res.status);
  }
};

export const validatePayload = <T extends AnyZodObject, D>(
  Schema: T,
  data: D
) => {
  const result = Schema.safeParse(data);
  if (result.success) {
    return result.data as z.infer<typeof Schema>;
  }
  throw result.error;
};