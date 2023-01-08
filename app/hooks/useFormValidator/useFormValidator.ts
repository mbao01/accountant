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
    isValid: false,
    isInvalid: true,
  });

  const zod = useMemo(() => {
    if (schema) return { schema, keys: Object.keys(schema.keyof().enum) };
  }, [schema]);

  const validate: FormEventHandler<HTMLFormElement> = useCallback(
    (e, ...d) => {
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
          // const value = valuesRef.current[key];
          acc[key] = {
            isValid,
            errors: fieldError,
            isInvalid: isValid === false,
            isDirty: valuesRef.current[key] !== undefined,
          };
          return acc;
        }, {} as ValidationState<T>["fields"]);

        const result = {
          fields,
          errors,
          isValid: c.success === true,
          isInvalid: c.success === false,
        };
        setValidation(result);
      }
    },
    [zod]
  );

  // useEffect(() => {
  //   const formEl = formRef.current;
  //   formEl?.addEventListener("focusout", validate as any, true);
  //   return () => {
  //     formEl?.removeEventListener("focusout", validate as any);
  //   };
  // }, [validate]);

  return { result: validation, validate };
};;
