"use client";

import { useCallback, useState } from "react";

export function useModal(initialOpen = false) {
  const [open, setOpen] = useState(initialOpen);

  const onOpenChange = useCallback((nextOpen: boolean) => {
    setOpen(nextOpen);
  }, []);

  const onOpen = useCallback(() => {
    setOpen(true);
  }, []);

  const onClose = useCallback(() => {
    setOpen(false);
  }, []);

  return { open, onOpenChange, onOpen, onClose, setOpen };
}
