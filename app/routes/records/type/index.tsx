import { json } from "@remix-run/server-runtime";
import { prisma } from "~/db.server";

export async function loader() {
  const res = await prisma.recordType.findMany();

  return json({ success: true, data: res }, 200);
}