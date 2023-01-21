import type debounce from "lodash.debounce";
import type { z, ZodSchema } from "zod";

type DebouncedFunc<T extends (...args: any) => any> = ReturnType<
  typeof debounce<T>
>;

export type TValidator = (args: {
  name: string;
  value: string | undefined;
}) => void;

export type TFieldValidation<T> = {
  name: keyof T;
  value?: unknown;
  errors: readonly string[];
  isValid?: boolean;
  isDirty?: boolean;
  isInvalid?: boolean;
  onValidate?: DebouncedFunc<TValidator>;
};

export type TField<T> = TFieldValidation<T>["name"];

export type ValidationState<T> = {
  isValid?: boolean;
  isDirty?: boolean;
  isInvalid?: boolean;
  fields: {
    readonly [K in TField<T>]-?: TFieldValidation<T>;
  };
  errors: {
    readonly [K in TField<T>]-?: string[] | undefined;
  };
};

export type TFields<T> = ValidationState<T>["fields"];

export type TErrors<T> = ValidationState<T>["errors"];

export type Schema<T extends ZodSchema> = z.infer<T>;
