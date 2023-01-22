import type { KeyboardEventHandler } from "react";

export const isNumberKey: KeyboardEventHandler = (evt) => {
  const charCode = evt.which ? evt.which : evt.keyCode;
  if (charCode > 31 && (charCode < 48 || charCode > 57)) return false;
  return true;
};

export const getNumberFromString = (str: string) => {
  return Number(str.replaceAll(/[^\d.]/gi, ""));
};

export const formatNumberWithCommas = (num: number) => {
  const nf = new Intl.NumberFormat("en");
  return nf.format(num);
};
