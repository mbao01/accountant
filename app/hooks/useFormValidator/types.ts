import type { z, ZodSchema } from "zod";

declare type allKeys<T> = T extends any ? keyof T : never;

type TFieldValidation = {
  errors: string[];
  isValid?: boolean;
  isDirty?: boolean;
  isInvalid?: boolean;
};

export type ValidationState<T> = Omit<TFieldValidation, "errors"> & {
  fields: Record<string, TFieldValidation>;
  errors: {
    [P in keyof T]?: string[];
  };
};

export type Schema<T extends ZodSchema> = z.infer<T>;
