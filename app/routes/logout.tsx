import type { ActionArgs } from "@remix-run/node";
import { redirect } from "@remix-run/node";

import { logout } from "~/session.server";

export const loader = async () => redirect("/");

export const action = async ({ request }: ActionArgs) => logout(request);
