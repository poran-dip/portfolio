import { useEffect } from "react";

/** Locks page scroll behind an open modal, dialog, or sheet while `active`
 * is true, restoring the previous overflow value on cleanup. Use this on
 * every full-screen overlay so background scroll behaves consistently. */
export const useBodyScrollLock = (active: boolean) => {
  useEffect(() => {
    if (!active) return;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = previousOverflow;
    };
  }, [active]);
};
