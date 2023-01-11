import clsx from "clsx";
import { TAG_LABEL } from "~/helpers/tag";
import {
  tagClass,
  tagContainerClass,
  tagLabelClass,
  tagTypeClasses,
} from "./classes";
import type { TagProps } from "./types";

export const Tag: React.FC<TagProps> = (props) => {
  const { name, full } = props;
  return (
    <div className={tagContainerClass}>
      <div className={clsx(tagClass, tagTypeClasses[name])} />
      {full && <span className={tagLabelClass}>{TAG_LABEL[name]}</span>}
    </div>
  );
};
