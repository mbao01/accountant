import { useEffect, useRef } from "react";

export const useDispatchInputEvent = (value: string | undefined) => {
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (inputRef.current) {
      const inputEl = inputRef.current;
      if (inputEl.value !== value) {
        const event = new Event("change", {
          bubbles: true,
          cancelable: true,
        });
        inputEl.value = value ?? "";
        inputEl.dispatchEvent(event);
      }
    }
  }, [value]);

  return inputRef;
};
