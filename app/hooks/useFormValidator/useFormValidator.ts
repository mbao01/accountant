import type { ZodObject, ZodRawShape } from "zod";
import {
  type FormEventHandler,
  useState,
  useCallback,
  useRef,
  useMemo,
} from "react";
import type { ValidationState } from "./types";

export const useFormValidator = <T extends ZodRawShape>(
  schema: ZodObject<T>
) => {
  const valuesRef = useRef<Record<string, unknown>>({});
  const [validation, setValidation] = useState<ValidationState<T>>({
    fields: {},
    errors: {},
  });

  const zod = useMemo(() => {
    if (schema) return { schema, keys: Object.keys(schema.keyof().enum) };
  }, [schema]);

  const validate: FormEventHandler<HTMLFormElement> = useCallback(
    (e) => {
      if (zod) {
        const { name, value } = e.target as HTMLInputElement;
        valuesRef.current = { ...valuesRef.current, [name]: value };
        const c = zod.schema.safeParse(valuesRef.current);
        const errors = (
          !c.success ? c.error.formErrors.fieldErrors : {}
        ) as ValidationState<T>["errors"];

        const fields = Object.values(zod.keys).reduce((acc, key) => {
          const fieldError = errors?.[key] ?? [];
          const isValid = fieldError.length === 0;
          acc[key] = {
            isValid,
            errors: fieldError,
            isInvalid: !isValid,
            isDirty: valuesRef.current[key] !== undefined,
          };
          return acc;
        }, {} as ValidationState<T>["fields"]);

        setValidation({
          fields,
          errors,
          isValid: c.success,
          isInvalid: !c.success,
        });
      }
    },
    [zod]
  );

  return { result: validation, validate };
};
