import type { ZodObject, ZodRawShape } from "zod";
import { useState, useCallback, useRef, useEffect, useMemo } from "react";
import debounce from "lodash.debounce";
import type { TErrors, TValidator, ValidationState } from "./types";
import { useTransition } from "@remix-run/react";

export const useForm = <T extends ZodRawShape>(
  schema: ZodObject<T>,
  action?: HTMLFormElement["action"]
) => {
  const formRef = useRef<HTMLFormElement>(null);
  const valuesRef = useRef<Record<string, unknown>>({});
  const transition = useTransition();

  const formState = useMemo(() => {
    const isCurrentForm = transition.submission?.action === action;
    return isCurrentForm ? transition.state : "inactive";
  }, [action, transition.submission?.action, transition.state]);

  useEffect(() => {
    if (formState === "idle") formRef.current?.reset();
  }, [action, formState]);

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const validate: TValidator = useCallback(
    debounce(({ name, value }) => {
      if (schema) {
        valuesRef.current = { ...valuesRef.current, [name]: value };
        const c = schema.safeParse(valuesRef.current);
        const errors = (
          !c.success ? c.error.formErrors.fieldErrors : {}
        ) as TErrors<T>;

        const fieldError = errors?.[name] ?? [];
        const isValid = fieldError.length === 0;

        const field = {
          name,
          isValid,
          fieldValue: value,
          errors: fieldError,
          isInvalid: isValid === false,
          isDirty: value !== undefined,
        };

        setValidation((v) => {
          const normField = { ...v.fields[name], ...field };
          return {
            ...v,
            errors,
            fields: { ...v.fields, [name]: normField },
            isValid: c.success === true,
            isInvalid: c.success === false,
          };
        });
      }
    }, 300),
    [schema]
  );

  const [validation, setValidation] = useState<ValidationState<T>>({
    fields: Object.fromEntries(
      Object.keys(schema.keyof().enum).map((key) => [
        key,
        { name: key, onValidate: validate },
      ])
    ),
    errors: {},
    isValid: false,
    isInvalid: true,
  } as ValidationState<T>);

  return {
    ...validation,
    validate,
    action,
    formRef,
    isSubmitting: formState === "submitting",
  };
};
