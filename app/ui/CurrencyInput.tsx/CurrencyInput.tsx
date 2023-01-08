import { currencySelectorClass } from "./classes";
import { Input } from "../Input";
import { CurrencyCode, type CurrencyInputProps, CurrencySign } from "./types";
import { useState } from "react";
import { Select } from "../Select";

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
          type="number"
          size={size}
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
