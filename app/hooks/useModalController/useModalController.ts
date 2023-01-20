import { useCallback, useMemo } from "react";
import { useSearchParams } from "@remix-run/react";

export const useModalController = <T extends string>(modalIds: T[]) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const modalId = searchParams.get("modal");
  const modals = useMemo(
    () => new Map<T, boolean>(modalIds.map((id) => [id, id === modalId])),
    [modalId, modalIds]
  );

  const onCloseModal = useCallback(() => {
    setSearchParams((s) => {
      s.delete("modal");
      return s;
    });
  }, [setSearchParams]);

  const openModal = useCallback(
    (modalId: string) => {
      setSearchParams((s) => ({
        ...s,
        modal: modalId,
      }));
    },
    [setSearchParams]
  );

  return {
    modals,
    openModal,
    onCloseModal,
  };
};
