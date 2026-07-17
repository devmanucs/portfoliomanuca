"use client";

import { useEffect, useState } from "react";

type UseTypewriterLoopOptions = {
  typingSpeed?: number;
  deletingSpeed?: number;
  pauseAfterTyping?: number;
  pauseAfterDeleting?: number;
  enabled?: boolean;
};

export function useTypewriterLoop(
  text: string,
  {
    typingSpeed = 38,
    deletingSpeed = 22,
    pauseAfterTyping = 1800,
    pauseAfterDeleting = 500,
    enabled = true,
  }: UseTypewriterLoopOptions = {},
): string {
  const [displayed, setDisplayed] = useState(enabled ? "" : text);

  useEffect(() => {
    if (!enabled) {
      setDisplayed(text);
      return;
    }

    let charIndex = 0;
    let phase: "typing" | "pausingFull" | "deleting" | "pausingEmpty" = "typing";
    let timeoutId: ReturnType<typeof setTimeout>;

    const tick = () => {
      if (phase === "typing") {
        charIndex++;
        setDisplayed(text.slice(0, charIndex));
        if (charIndex >= text.length) {
          phase = "pausingFull";
          timeoutId = setTimeout(tick, pauseAfterTyping);
        } else {
          timeoutId = setTimeout(tick, typingSpeed);
        }
      } else if (phase === "pausingFull") {
        phase = "deleting";
        timeoutId = setTimeout(tick, deletingSpeed);
      } else if (phase === "deleting") {
        charIndex--;
        setDisplayed(text.slice(0, charIndex));
        if (charIndex <= 0) {
          phase = "pausingEmpty";
          timeoutId = setTimeout(tick, pauseAfterDeleting);
        } else {
          timeoutId = setTimeout(tick, deletingSpeed);
        }
      } else if (phase === "pausingEmpty") {
        phase = "typing";
        timeoutId = setTimeout(tick, typingSpeed);
      }
    };

    timeoutId = setTimeout(tick, typingSpeed);
    return () => clearTimeout(timeoutId);
  }, [text, typingSpeed, deletingSpeed, pauseAfterTyping, pauseAfterDeleting, enabled]);

  return displayed;
}
