import type { ZodObject, ZodRawShape } from "zod";
import { type FormEventHandler, useState, useCallback, useRef } from "react";
import type { TFieldValidation, ValidationState } from "./types";

export const useFormValidator = <T extends ZodRawShape>(
  schema: ZodObject<T>
) => {
  const valuesRef = useRef<Record<string, unknown>>({});
  const [validation, setValidation] = useState<ValidationState<T>>({
    fields: new Map(
      Object.keys(schema.keyof().enum).map((key) => [
        key,
        {} as TFieldValidation,
      ])
    ),
    errors: {},
    isValid: false,
    isInvalid: true,
  });

  const validate: FormEventHandler<HTMLFormElement> = useCallback(
    (e) => {
      if (schema) {
        const { name, value } = e.target as HTMLInputElement;
        valuesRef.current = { ...valuesRef.current, [name]: value };
        const c = schema.safeParse(valuesRef.current);
        const errors = (
          !c.success ? c.error.formErrors.fieldErrors : {}
        ) as ValidationState<T>["errors"];

        const fieldError = errors?.[name] ?? [];
        const isValid = fieldError.length === 0;

        const field = {
          isValid,
          errors: fieldError,
          isInvalid: isValid === false,
          isDirty: valuesRef.current[name] !== undefined,
        };

        setValidation((v) => ({
          errors,
          fields: v.fields.set(name, field),
          isValid: c.success === true,
          isInvalid: c.success === false,
        }));
      }
    },
    [schema]
  );

  return { ...validation, validate };
};;
