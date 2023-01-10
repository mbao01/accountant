export const popoverTransition = {
  enter: "transition ease-out duration-200",
  enterFrom: "opacity-0 translate-y-1",
  enterTo: "opacity-100 translate-y-0",
  leave: "transition ease-in duration-150",
  leaveFrom: "opacity-100 translate-y-0",
  leaveTo: "opacity-0 translate-y-1",
};

export const popoverClass = "relative";

export const popoverPanelClass =
  "absolute left-1/2 z-10 mt-3 w-auto -translate-x-1/2 transform overflow-hidden rounded-lg shadow-lg";
