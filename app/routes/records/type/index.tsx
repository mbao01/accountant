import { typedjson } from "remix-typedjson";
import { getRecordTypes } from "~/models/record.server";

export async function loader() {
  const res = await getRecordTypes({
    RecordCategory: { select: { id: true, name: true } },
  });

  return typedjson({ success: true, data: res }, 200);
}
