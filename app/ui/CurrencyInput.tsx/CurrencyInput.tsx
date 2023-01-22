import React, { type ChangeEventHandler, useState } from "react";
import { formatNumberWithCommas, getNumberFromString } from "~/helpers/number";
import { Input } from "../Input";
import { Select } from "../Select";
import { currencyClass, currencySelectorClass } from "./classes";
import { CURRENCY_MAP, CURRENCY_OPTIONS } from "./constant";
import { type CurrencyInputProps } from "./types";

export const CurrencyInput: React.FC<CurrencyInputProps> = React.memo(
  (props) => {
    const {
      code,
      name,
      size,
      onValidate,
      placeholder = "0.00",
      currencyProps,
      ...inputProps
    } = props;
    const [amount, setAmount] = useState<string>("");

    const handleAmountChange: ChangeEventHandler<HTMLInputElement> = (e) => {
      const cleanNumber = getNumberFromString(e.target.value);
      const newAmount = formatNumberWithCommas(cleanNumber);
      setAmount(newAmount);
      onValidate?.({ name, value: String(cleanNumber) });
    };

    return (
      <div className="relative flex">
        <div className="w-full">
          <Input
            step="any"
            type="text"
            name={name}
            size={size}
            className="pr-12"
            inputMode="decimal"
            value={amount}
            onChange={handleAmountChange}
            placeholder={placeholder}
            onValidate={onValidate}
            {...inputProps}
          />
        </div>
        <div className="absolute right-0 bottom-0">
          {code && (
            <div className={currencyClass}>
              <input
                type="hidden"
                name={currencyProps?.name as string}
                value={code}
              />
              {CURRENCY_MAP[code]}
            </div>
          )}
          {!code && (
            <Select
              size={size}
              options={CURRENCY_OPTIONS}
              defaultValue={CURRENCY_OPTIONS[0].value}
              className={currencySelectorClass}
              {...currencyProps}
              name={currencyProps?.name as string}
            />
          )}
        </div>
      </div>
    );
  }
);
