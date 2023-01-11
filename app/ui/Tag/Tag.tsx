import clsx from "clsx";
import { TAG_LABEL } from "~/helpers/tag";
import {
  labelClass,
  tagClass,
  tagContainerClass,
  tagLabelClass,
  tagTypeClasses,
} from "./classes";
import type { TagProps } from "./types";

export const Tag: React.FC<TagProps> = (props) => {
  const { name, full, size = "md" } = props;
  return (
    <div className={clsx(tagContainerClass, labelClass[size])}>
      <div className={clsx(tagClass, tagTypeClasses[name])} />
      {full && <span className={tagLabelClass}>{TAG_LABEL[name]}</span>}
    </div>
  );
};
