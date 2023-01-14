import { type ActionArgs, redirect } from "@remix-run/server-runtime";

export const redirectRequest = (request: ActionArgs["request"]) => {
  const url = new URL(request.url);
  const params = new URLSearchParams(url.search);
  const redirectUrl = params.get("redirect") ?? "/";
  params.delete("redirect"); // delete redirect path

  const fullRedirectUrl = `${redirectUrl}?${params.toString()}`;
  return redirect(fullRedirectUrl);
};
