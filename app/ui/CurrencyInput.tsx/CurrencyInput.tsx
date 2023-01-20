import React from "react";
import { Input } from "../Input";
import { Select } from "../Select";
import { currencySelectorClass } from "./classes";
import { CURRENCY_OPTIONS } from "./constant";
import { type CurrencyInputProps } from "./types";

export const CurrencyInput: React.FC<CurrencyInputProps> = React.memo(
  (props) => {
    const {
      code,
      size,
      placeholder = "0.00",
      currencyProps,
      ...inputProps
    } = props;
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
            options={CURRENCY_OPTIONS}
            defaultValue={CURRENCY_OPTIONS[0].value}
            className={currencySelectorClass}
            {...currencyProps}
          />
        </div>
      </div>
    );
  }
);
