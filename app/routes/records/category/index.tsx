import { json } from "@remix-run/server-runtime";
import { getRecordCategories } from "~/models/record.server";

export async function loader() {
  const res = await getRecordCategories();
  return json({ success: true, data: res }, 200);
}
