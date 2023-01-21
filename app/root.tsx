import {
  json,
  type LinksFunction,
  type LoaderArgs,
  type MetaFunction,
} from "@remix-run/node";
import {
  Links,
  LiveReload,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
  useLoaderData,
} from "@remix-run/react";

import rootStylesheetUrl from "./styles/root.css";
import tailwindStylesheetUrl from "./styles/tailwind.css";
import { requireUser } from "./session.server";
import { Layout } from "./components/Layout";
import { Route } from "./routes.enum";
import httpStatus from "http-status";

export const links: LinksFunction = () => {
  return [
    { rel: "stylesheet", href: rootStylesheetUrl },
    { rel: "stylesheet", href: tailwindStylesheetUrl },
  ];
};

export const meta: MetaFunction = () => ({
  charset: "utf-8",
  title: "Accountant App",
  viewport: "width=device-width,initial-scale=1",
});

export async function loader({ request }: LoaderArgs) {
  const url = new URL(request.url);

  if (!["", Route.LOGIN, Route.LOGOUT].includes(url.pathname)) {
    const user = await requireUser(request);
    return json({ success: true, data: user }, httpStatus.OK);
  }

  return null;
}

export default function App() {
  const loaderData = useLoaderData();
  return (
    <html lang="en" className="h-full">
      <head>
        <Meta />
        <Links />
      </head>
      <body className="h-full">
        <Layout user={loaderData?.data!}>
          <Outlet />
          <ScrollRestoration />
          <Scripts />
          <LiveReload />
        </Layout>
      </body>
    </html>
  );
}
