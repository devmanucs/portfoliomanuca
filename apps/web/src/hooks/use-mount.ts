import { useEffect, type EffectCallback } from "react";

type MountCallback = EffectCallback | (() => Promise<void | (() => void)>);

export function useMount(fn: MountCallback) {
  useEffect(() => {
    const result = fn?.();

    if (
      result &&
      typeof result === "object" &&
      typeof (result as Promise<void>).then === "function"
    ) {
      return;
    }

    return result as ReturnType<EffectCallback>;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
}
