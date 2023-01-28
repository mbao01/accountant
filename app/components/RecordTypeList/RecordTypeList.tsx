import { Badge } from "~/ui/Badge";
import { InfoCircleIcon } from "~/ui/Icons";
import { Tooltip } from "~/ui/Tooltip";
import type { RecordTypeListProps } from "./types";

export const RecordTypeList: React.FC<RecordTypeListProps> = (props) => (
  <div className="w-full max-w-xs">
    <h3 className="px-2 py-2 text-xs uppercase text-gray-500">Record Types</h3>
    <ul className="h-48 overflow-auto rounded shadow-md shadow-gray-200 ring-1 ring-gray-200">
      {props.items.map(({ id, name, description, _count }) => (
        <li
          key={id}
          className="flex items-center justify-between gap-4 p-3 text-sm odd:bg-gray-100"
        >
          <div className="flex items-center gap-1">
            {name}
            <Tooltip text={description}>
              <InfoCircleIcon size="sm" />
            </Tooltip>
          </div>
          <div className="flex flex-nowrap gap-2">
            <Tooltip text="No. of accounts">
              <Badge color="blue" value={String(_count?.Account)} />
            </Tooltip>
            <Tooltip text="No. of records">
              <Badge color="red" value={String(_count?.Record)} />
            </Tooltip>
            <Tooltip text="No. of categories">
              <Badge color="yellow" value={String(_count?.RecordCategory)} />
            </Tooltip>
          </div>
        </li>
      ))}
    </ul>
  </div>
);
