export const backdropTransition = {
  enter: "ease-out duration-300",
  enterFrom: "opacity-0",
  enterTo: "opacity-100",
  leave: "ease-in duration-200",
  leaveFrom: "opacity-100",
  leaveTo: "opacity-0",
};

export const backdropClass = "fixed inset-0 bg-black bg-opacity-25";

export const dialogTransition = {
  enter: "ease-out duration-300",
  enterFrom: "opacity-0 scale-95",
  enterTo: "opacity-100 scale-100",
  leave: "ease-in duration-200",
  leaveFrom: "opacity-100 scale-100",
  leaveTo: "opacity-0 scale-95",
};

export const dialogClass = "relative z-10";

export const dialogPanelContainerClass =
  "fixed inset-0 flex items-center justify-center p-4";

export const dialogPanelClass =
  "w-auto transform rounded-2xl bg-transparent text-left align-middle shadow-xl transition-all";

export const dialogTitleClass =
  "text-sm uppercase leading-7 text-gray-600 pl-6 pr-9 mt-6";

export const dialogDescriptionClass = "text-xs px-6 mb-2 text-gray-800";

export const closeButtonClass =
  "absolute right-2 top-2 bg-transparent rounded-full transition text-gray-700 hover:text-gray-900";
