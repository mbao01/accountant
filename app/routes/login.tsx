import type { ActionArgs, LoaderArgs, MetaFunction } from "@remix-run/node";
import { json, redirect } from "@remix-run/node";
import { Form, useActionData, useSearchParams } from "@remix-run/react";
import * as React from "react";

import { createUserSession, getUserId } from "~/session.server";
import { verifyLogin } from "~/models/user.server";
import { safeRedirect, validateEmail } from "~/utils";
import { Route } from "~/routes.enum";
import { Button } from "~/ui/Button";
import { Input } from "~/ui/Input";
import { Spacing } from "~/ui/Spacing";
import { useFormValidator } from "~/hooks/useFormValidator";
import { LoginUserObjectSchema } from "~/schemas/user";

export async function loader({ request }: LoaderArgs) {
  const userId = await getUserId(request);
  if (userId) return redirect(Route.ROOT);
  return json({});
}

export async function action({ request }: ActionArgs) {
  const formData = await request.formData();
  const email = formData.get("email");
  const password = formData.get("password");
  const redirectTo = safeRedirect(formData.get("redirectTo"), Route.RECORDS);
  const remember = formData.get("remember");

  if (!validateEmail(email)) {
    return json({ error: "Email is invalid" }, { status: 400 });
  }

  if (typeof password !== "string" || password.length === 0) {
    return json({ error: "Password is required" }, { status: 400 });
  }

  if (password.length < 8) {
    return json({ error: "Password is too short" }, { status: 400 });
  }

  const user = await verifyLogin(email, password);

  if (!user) {
    return json({ error: "Invalid email or password" }, { status: 400 });
  }

  return createUserSession({
    request,
    userId: user.id,
    remember: remember === "on" ? true : false,
    redirectTo,
  });
}

export const meta: MetaFunction = () => {
  return {
    title: "Login",
  };
};

export default function LoginPage() {
  const [searchParams] = useSearchParams();
  const redirectTo = searchParams.get("redirectTo") || Route.RECORDS;
  const actionData = useActionData<typeof action>();
  const validator = useFormValidator(LoginUserObjectSchema);
  const fields = validator.fields;

  return (
    <Form
      method="post"
      className="mx-auto mt-20 w-full max-w-md rounded-lg px-6 py-4 shadow-lg shadow-gray-200 ring-1 ring-gray-200"
    >
      <h4 className="my-0 text-lg font-bold text-gray-900">Log in</h4>
      <Spacing />
      <input type="hidden" name="redirectTo" value={redirectTo} />
      <div className="grid grid-cols-2 gap-4">
        <Input
          autoFocus
          size="sm"
          type="email"
          label="Email address"
          {...fields.email}
        />
        <Input
          size="sm"
          type="password"
          label="Password"
          {...fields.password}
        />
      </div>
      <Spacing vertical={actionData?.error ? "2" : "4"} />
      <div className="flex flex-col items-center justify-center">
        {actionData?.error && (
          <>
            <span className="text-sm text-red-400">{actionData?.error}</span>
            <Spacing />
          </>
        )}
        <Button size="sm" type="submit" disabled={validator.isInvalid}>
          Log in
        </Button>
        <Spacing />
        <div className="flex items-center gap-2">
          <input
            id="remember"
            name="remember"
            type="checkbox"
            className="h-4 w-4 rounded border-gray-300 text-purple-600 transition focus:ring-purple-500"
          />
          <label
            htmlFor="remember"
            className="block text-xs font-normal text-gray-500"
          >
            Remember me
          </label>
        </div>
      </div>
    </Form>
  );
}
