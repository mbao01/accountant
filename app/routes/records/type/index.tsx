import { json } from "@remix-run/server-runtime";
import { getRecordTypes } from "~/models/record.server";

export async function loader() {
  const res = await getRecordTypes();

  return json({ success: true, data: res }, 200);
}
