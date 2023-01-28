import type { KeyboardEventHandler } from "react";

export const isNumberKey: KeyboardEventHandler = (evt) => {
  const charCode = evt.which ? evt.which : evt.keyCode;
  if (charCode > 31 && (charCode < 48 || charCode > 57)) return false;
  return true;
};

export const getNumberFromString = (str: string) => {
  return str.replace(/[^\d.]/g, "");
};

export const formatNumberWithCommas = (num: number | string) => {
  let strNum = String(num);
  const delimiterCount = strNum.split(".").length - 1;
  if (delimiterCount > 1) {
    strNum = strNum.replace(
      /[.]/g,
      (
        (i) => (m: string) =>
          !i++ ? m : ""
      )(0)
    );
  }
  const disallow = strNum.endsWith(".") || strNum.endsWith("0");
  if (disallow) return strNum;

  const nf = new Intl.NumberFormat("en");
  return nf.format(strNum as unknown as number);
};
