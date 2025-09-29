"use client";

import dynamic from "next/dynamic";
import { useEffect } from "react";

declare global {
  interface Window {
    HSCarousel?: {
      autoInit: () => void;
    };
  }
}

const PrelineScript = dynamic(() => import("./PrelineScript"), {
  ssr: false,
});

export default function PrelineScriptWrapper() {
  useEffect(() => {
    const reinitializePreline = () => {
      if (window.HSCarousel) {
        window.HSCarousel.autoInit();
      }
    };

    window.addEventListener("preline-reinit", reinitializePreline);

    return () => {
      window.removeEventListener("preline-reinit", reinitializePreline);
    };
  }, []);
  return <PrelineScript />;
}
