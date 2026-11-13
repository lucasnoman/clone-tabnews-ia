"use client";

import { useEffect, useState } from "react";
import dynamic from "next/dynamic";

const Confetti = dynamic(() => import("./confetti"), {
  ssr: false,
  loading: () => null,
});

export default function ConfettiLoader() {
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");

    if (mediaQuery.matches) {
      setIsReady(false);
      return undefined;
    }

    const startDelay = window.setTimeout(() => {
      setIsReady(true);
    }, 150);

    return () => window.clearTimeout(startDelay);
  }, []);

  if (!isReady) {
    return null;
  }

  return <Confetti />;
}
