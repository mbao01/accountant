import type { ActionArgs } from "@remix-run/node";
import { redirect } from "@remix-run/node";
import { Route } from "~/routes.enum";

import { logout } from "~/session.server";

export const loader = async () => redirect(Route.ROOT);

export const action = async ({ request }: ActionArgs) => logout(request);
