import type { z, ZodSchema } from "zod";

type allKeys<T> = T extends any ? keyof T : never;

export type TFieldValidation = {
  value?: unknown;
  errors: string[];
  isValid?: boolean;
  isDirty?: boolean;
  isInvalid?: boolean;
};

export type ValidationState<T> = Omit<TFieldValidation, "errors"> & {
  fields: Map<string, TFieldValidation>;
  errors: {
    [P in string]?: string[];
  };
};

export type Schema<T extends ZodSchema> = z.infer<T>;
