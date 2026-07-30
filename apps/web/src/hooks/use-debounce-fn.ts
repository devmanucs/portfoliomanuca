import { useMemo } from "react";
import { useLatest } from "@/hooks/use-latest";
import { useUnmount } from "@/hooks/use-unmount";

export type DebounceOptions = {
  leading?: boolean;
  trailing?: boolean;
  maxWait?: number;
};

type DebouncedFn<Fn extends (...args: never[]) => unknown> = ((
  ...args: Parameters<Fn>
) => void) & {
  cancel: () => void;
  flush: () => void;
};

function createDebouncedFn<Fn extends (...args: never[]) => unknown>(
  fnRef: ReturnType<typeof useLatest<Fn>>,
  debounceMs: number,
  options?: DebounceOptions,
): DebouncedFn<Fn> {
  let timeoutId: ReturnType<typeof setTimeout> | undefined;
  let lastArgs: Parameters<Fn> | undefined;
  let maxTimeoutId: ReturnType<typeof setTimeout> | undefined;
  let lastCallTime: number | undefined;

  const invoke = () => {
    if (!lastArgs) return;
    fnRef.current(...lastArgs);
    lastArgs = undefined;
    lastCallTime = undefined;
  };

  const debounced = ((...args: Parameters<Fn>) => {
    lastArgs = args;
    const now = Date.now();

    if (options?.leading && lastCallTime === undefined) {
      fnRef.current(...args);
      lastCallTime = now;
      return;
    }

    if (timeoutId) clearTimeout(timeoutId);

    timeoutId = setTimeout(() => {
      if (options?.trailing !== false) invoke();
      timeoutId = undefined;
      if (maxTimeoutId) {
        clearTimeout(maxTimeoutId);
        maxTimeoutId = undefined;
      }
    }, debounceMs);

    if (options?.maxWait && !maxTimeoutId) {
      maxTimeoutId = setTimeout(() => {
        invoke();
        if (timeoutId) clearTimeout(timeoutId);
        timeoutId = undefined;
        maxTimeoutId = undefined;
      }, options.maxWait);
    }
  }) as DebouncedFn<Fn>;

  debounced.cancel = () => {
    if (timeoutId) clearTimeout(timeoutId);
    if (maxTimeoutId) clearTimeout(maxTimeoutId);
    timeoutId = undefined;
    maxTimeoutId = undefined;
    lastArgs = undefined;
    lastCallTime = undefined;
  };

  debounced.flush = () => {
    if (timeoutId) clearTimeout(timeoutId);
    if (maxTimeoutId) clearTimeout(maxTimeoutId);
    invoke();
    timeoutId = undefined;
    maxTimeoutId = undefined;
  };

  return debounced;
}

export function useDebounceFn<Fn extends (...args: never[]) => unknown>(
  fn: Fn,
  debounceMs = 1000,
  options?: DebounceOptions,
) {
  const fnRef = useLatest(fn);

  const debouncedFn = useMemo(
    () => createDebouncedFn(fnRef, debounceMs, options),
  // eslint-disable-next-line react-hooks/exhaustive-deps
    [debounceMs, options?.leading, options?.trailing, options?.maxWait],
  );

  useUnmount(() => debouncedFn.cancel());

  return {
    run: debouncedFn,
    cancel: debouncedFn.cancel,
    flush: debouncedFn.flush,
  };
}
