import { useState } from "react";
import { Input } from "../Input";
import { Select } from "../Select";
import { currencySelectorClass } from "./classes";
import { CurrencyCode, type CurrencyInputProps, CurrencySign } from "./types";

export const CurrencyInput: React.FC<CurrencyInputProps> = (props) => {
  const { currencyCode, size, placeholder = "0.00", ...inputProps } = props;
  const [currency, setCurrency] = useState(currencyCode);
  const currencies = [
    { label: CurrencySign.NGN, value: CurrencyCode.NGN },
    { label: CurrencySign.GBP, value: CurrencyCode.GBP },
    { label: CurrencySign.USD, value: CurrencyCode.USD },
    { label: CurrencySign.EUR, value: CurrencyCode.EUR },
    { label: CurrencySign.CNY, value: CurrencyCode.CNY },
  ];

  return (
    <div className="relative flex">
      <div className="w-full">
        <Input
          step="any"
          type="number"
          size={size}
          className="pr-12"
          placeholder={placeholder}
          {...inputProps}
        />
      </div>
      <div className="absolute right-0 bottom-0">
        <Select
          size={size}
          options={currencies}
          className={currencySelectorClass}
        />
      </div>
    </div>
  );
};
