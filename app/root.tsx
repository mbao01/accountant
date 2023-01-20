import type { LinksFunction, LoaderArgs, MetaFunction } from "@remix-run/node";
import {
  Links,
  LiveReload,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
} from "@remix-run/react";

import rootStylesheetUrl from "./styles/root.css";
import tailwindStylesheetUrl from "./styles/tailwind.css";
import { requireUserId } from "./session.server";
import { Layout } from "./components/Layout";
import { Route } from "./routes.enum";

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

  if (!["", Route.LOGIN, Route.LOGOUT].includes(url.pathname))
    await requireUserId(request);

  return null;
}

export default function App() {
  return (
    <html lang="en" className="h-full">
      <head>
        <Meta />
        <Links />
      </head>
      <body className="h-full">
        <Layout>
          <Outlet />
          <ScrollRestoration />
          <Scripts />
          <LiveReload />
        </Layout>
      </body>
    </html>
  );
}
