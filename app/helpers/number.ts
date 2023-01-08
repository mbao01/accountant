import type { KeyboardEventHandler } from "react";

export const isNumberKey: KeyboardEventHandler = (evt) => {
  const charCode = evt.which ? evt.which : evt.keyCode;
  console.log("CharCode: ", charCode);
  if (charCode > 31 && (charCode < 48 || charCode > 57)) return false;
  return true;
};
