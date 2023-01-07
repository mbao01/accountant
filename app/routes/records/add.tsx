import { json, redirect, type ActionArgs } from "@remix-run/server-runtime";

export async function loader({ request }: ActionArgs) {
  const url = new URL(request.url);
  const params = new URLSearchParams(url.search);
  const redirectUrl = params.get("redirect") ?? "/";
  params.delete("redirect"); // delete redirect path

  const fullRedirectUrl = `${redirectUrl}?${params.toString()}`;
  return redirect(fullRedirectUrl);
}

export async function action({ request }: ActionArgs) {
  let formData = await request.formData();
  const values = Object.fromEntries(formData);
  return json({ success: true, ...values }, 200);
}
