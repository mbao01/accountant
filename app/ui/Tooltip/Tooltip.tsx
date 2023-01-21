import { type MouseEventHandler, useRef } from "react";
import { tooltipClass, tooltipGroupClass } from "./classes";
import type { TooltipProps } from "./types";

export const Tooltip: React.FC<TooltipProps> = (props) => {
  const { children, text } = props;
  const tooltipRef = useRef<HTMLSpanElement>(null);
  const groupRef = useRef<HTMLDivElement>(null);

  const handleMouseEnter: MouseEventHandler = ({ clientX }) => {
    if (!tooltipRef.current || !groupRef.current) return;
    const { top, height } = groupRef.current.getBoundingClientRect();

    tooltipRef.current.style.left = clientX + "px";
    tooltipRef.current.style.top = top + height / 2 + 12 + "px";
  };

  return (
    <div
      ref={groupRef}
      onMouseEnter={handleMouseEnter}
      className={tooltipGroupClass}
    >
      {children}
      <span ref={tooltipRef} className={tooltipClass}>
        {text}
      </span>
    </div>
  );
};
