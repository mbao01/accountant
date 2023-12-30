import type { ActionArgs, MetaFunction } from "@remix-run/node";
import { redirect } from "@remix-run/node";
import { Form, useSearchParams } from "@remix-run/react";

import { resetPassword, getUserByEmail } from "~/models/user.server";
import { validateEmail } from "~/utils";
import { Input } from "~/ui/Input";
import { Spacing } from "~/ui/Spacing";
import { Button } from "~/ui/Button";
import { useForm } from "~/hooks/useForm";
import { ResetPasswordObjectSchema } from "~/schemas/user.schema";
import { typedjson } from "remix-typedjson";
import { Route } from "~/routes.enum";

export async function action({ request }: ActionArgs) {
  const formData = await request.formData();
  const { password, email, secret } = Object.fromEntries(formData);
  if (secret !== process.env.TMP_ACCESS_SECRET) return redirect(Route.ROOT);

  if (!validateEmail(email)) {
    return typedjson({ error: "Email is invalid" }, { status: 400 });
  }

  if (typeof password !== "string" || password.length === 0) {
    return typedjson({ error: "Password is required" }, { status: 400 });
  }

  if (password.length < 8) {
    return typedjson({ error: "Password is too short" }, { status: 400 });
  }

  const existingUser = await getUserByEmail(email);
  if (existingUser) {
    return typedjson(
      {
        error: "A user already exists with this email",
      },
      { status: 400 }
    );
  }

  await resetPassword(email, password);

  return redirect(Route.LOGIN);
}

export const meta: MetaFunction = () => {
  return {
    title: "Reset Password",
  };
};

export default function Register() {
  const [searchParams] = useSearchParams();
  const redirectTo = searchParams.get("redirectTo") ?? undefined;
  const form = useForm(ResetPasswordObjectSchema);
  const fields = form.fields;

  return (
    <Form
      method="post"
      className="mx-auto mt-20 w-full max-w-md rounded-lg px-6 py-4 shadow-lg shadow-gray-200 ring-1 ring-gray-200"
    >
      <h4 className="my-0 text-lg font-bold text-gray-900">Reset Password</h4>
      <Spacing />
      <input type="hidden" name="redirectTo" value={redirectTo} />
      <div className="grid grid-cols-2 gap-4">
        <Input
          required
          autoFocus
          size="sm"
          type="email"
          label="Email address"
          inputMode="email"
          {...fields.email}
        />
        <Input
          required
          size="sm"
          type="password"
          label="Password"
          {...fields.password}
        />
      </div>
      <Spacing />
      <Input required size="sm" type="text" label="Secret" {...fields.secret} />
      <Spacing />
      <Button
        size="sm"
        type="submit"
        loading={form.isSubmitting}
        disabled={form.isSubmitting || form.isInvalid}
      >
        Reset Password
      </Button>
    </Form>
  );
}
