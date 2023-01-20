import { useCallback } from "react";
import { useLocation, useNavigate } from "@remix-run/react";
import type { ModalId } from "./types";

export const useOpenModal = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const openModal = useCallback(
    (modalId: ModalId, route?: string) => {
      const pathname = route ?? location.pathname;
      const url = new URL(
        `${pathname}${location.search}`,
        window.location.origin
      );
      url.searchParams.set("modal", modalId);
      navigate(`${url.pathname}${url.search}`);
    },
    [location, navigate]
  );

  return openModal;
};
