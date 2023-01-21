import { RECORD_TYPE_BADGE_COLOR } from "~/helpers/colors";
import { Badge } from "~/ui/Badge";
import { InfoCircleIcon } from "~/ui/Icons";
import { Tooltip } from "~/ui/Tooltip";
import type { RecordCategoryListProps } from "./types";

export const RecordCategoryList: React.FC<RecordCategoryListProps> = (
  props
) => (
  <div className="w-full max-w-xs">
    <h3 className="px-2 py-2 text-xs uppercase text-gray-500">
      Record Categories
    </h3>
    <ul className="h-48 overflow-auto rounded shadow-md shadow-gray-200 ring-1 ring-gray-200">
      {props.items.map(({ id, name, description, RecordType }) => (
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
          <Badge
            color={RECORD_TYPE_BADGE_COLOR[RecordType.name]}
            value={RecordType.name}
          />
        </li>
      ))}
    </ul>
  </div>
);
