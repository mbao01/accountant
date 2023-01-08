import type { z, ZodSchema } from "zod";

export type TFieldValidation = {
  errors: string[];
  isValid?: boolean;
  isDirty?: boolean;
  isInvalid?: boolean;
};

export type ValidationState<T> = Omit<TFieldValidation, "errors"> & {
  fields: Map<string, TFieldValidation>;
  errors: {
    [P in keyof T]?: string[];
  };
};

export type Schema<T extends ZodSchema> = z.infer<T>;
