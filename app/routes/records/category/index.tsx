import { typedjson } from "remix-typedjson";
import { getRecordCategories } from "~/models/record.server";

export async function loader() {
  const res = await getRecordCategories();
  return typedjson({ success: true, data: res }, 200);
}
