import { ROLE_MAP } from "~/helpers/role";
import { Badge } from "~/ui/Badge";
import { Tooltip } from "~/ui/Tooltip";
import type { UserListProps } from "./types";

export const UserList: React.FC<UserListProps> = (props) => (
  <div className="w-full max-w-xs">
    <h3 className="px-2 py-2 text-xs uppercase text-gray-500">Users</h3>
    <ul className="h-48 overflow-auto rounded shadow-md shadow-gray-200 ring-1 ring-gray-200">
      {props.items.map(({ id, firstname, role, _count }) => (
        <li
          key={id}
          className="flex items-center justify-between gap-4 p-3 text-sm odd:bg-gray-100"
        >
          <div className="flex items-center gap-1">
            {firstname}
            <Badge color="gray" value={ROLE_MAP[role]} />
          </div>
          <Tooltip text="No. of accounts">
            <Badge color="blue" value={String(_count?.Account)} />
          </Tooltip>
        </li>
      ))}
    </ul>
  </div>
);
