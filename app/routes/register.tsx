import type { ActionArgs, LoaderArgs, MetaFunction } from "@remix-run/node";
import { redirect } from "@remix-run/node";
import { Form, Link, useSearchParams } from "@remix-run/react";

import { requireUser } from "~/session.server";

import { createUser, getUserByEmail } from "~/models/user.server";
import { safeRedirect, validateEmail } from "~/utils";
import { Route } from "~/routes.enum";
import { Role } from "@prisma/client";
import { Input } from "~/ui/Input";
import { Spacing } from "~/ui/Spacing";
import { Select } from "~/ui/Select";
import { Button } from "~/ui/Button";
import { ROLE_OPTIONS } from "~/helpers/role";
import { useFormValidator } from "~/hooks/useFormValidator";
import { CreateUserObjectSchema } from "~/schemas/user";
import { validatePayload } from "~/helpers/api";
import { typedjson, useTypedActionData } from "remix-typedjson";

export async function loader({ request }: LoaderArgs) {
  const user = await requireUser(request);
  if (user.role !== Role.OWNER) return redirect(Route.ROOT);

  return typedjson({});
}

export async function action({ request }: ActionArgs) {
  const formData = await request.formData();
  const { password, ...userData } = Object.fromEntries(formData);
  const user = validatePayload(CreateUserObjectSchema, userData);
  const redirectTo = safeRedirect(formData.get("redirectTo"), Route.ROOT);

  if (!validateEmail(user.email)) {
    return typedjson({ error: "Email is invalid" }, { status: 400 });
  }

  if (typeof password !== "string" || password.length === 0) {
    return typedjson({ error: "Password is required" }, { status: 400 });
  }

  if (password.length < 8) {
    return typedjson({ error: "Password is too short" }, { status: 400 });
  }

  const existingUser = await getUserByEmail(user.email);
  if (existingUser) {
    return typedjson(
      {
        error: "A user already exists with this email",
      },
      { status: 400 }
    );
  }

  await createUser(user, password);

  return redirect(redirectTo);
}

export const meta: MetaFunction = () => {
  return {
    title: "Register User",
  };
};

export default function Register() {
  const [searchParams] = useSearchParams();
  const redirectTo = searchParams.get("redirectTo") ?? undefined;
  const actionData = useTypedActionData();
  const validator = useFormValidator(CreateUserObjectSchema);
  const fields = validator.fields;

  return (
    <Form
      method="post"
      className="mx-auto mt-20 w-full max-w-md rounded-lg px-6 py-4 shadow-lg shadow-gray-200 ring-1 ring-gray-200"
    >
      <h4 className="my-0 text-lg font-bold text-gray-900">Create User</h4>
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
          autoFocus
          size="sm"
          type="text"
          label="First name"
          {...fields.firstname}
        />
      </div>
      <Spacing />
      <div className="grid grid-cols-2 gap-4">
        <Input
          size="sm"
          type="password"
          name="password"
          label="Password"
          required
        />
        <Select
          required
          size="sm"
          label="Role"
          options={ROLE_OPTIONS}
          defaultValue={ROLE_OPTIONS[0].value}
          {...fields.role}
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
          Create User
        </Button>
        <Spacing />
        <Link
          prefetch="intent"
          className="text-xs text-gray-500 underline"
          to={{
            pathname: Route.LOGIN,
            search: searchParams.toString(),
          }}
        >
          Go back
        </Link>
      </div>
    </Form>
  );
}
