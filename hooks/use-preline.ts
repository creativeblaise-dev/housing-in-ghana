"use client";

import { useEffect } from "react";

/**
 * Custom hook to ensure Preline components are properly initialized
 * Use this in components that rely on Preline UI functionality
 */
export function usePreline() {
  useEffect(() => {
    const initializePreline = () => {
      if (typeof window !== "undefined" && window.HSStaticMethods) {
        // Small delay to ensure DOM is ready
        setTimeout(() => {
          window.HSStaticMethods.autoInit();
        }, 50);
      }
    };

    // Initialize immediately
    initializePreline();

    // Also initialize after a short delay (for dynamic content)
    const timeoutId = setTimeout(initializePreline, 200);

    return () => {
      clearTimeout(timeoutId);
    };
  }, []);
}

/**
 * Force reinitialize all Preline components
 * Useful after dynamic content changes
 */
export function reinitializePreline() {
  if (typeof window !== "undefined") {
    // Dispatch custom event
    window.dispatchEvent(new CustomEvent("preline-reinit"));

    // Also directly call autoInit
    if (window.HSStaticMethods) {
      setTimeout(() => {
        window.HSStaticMethods.autoInit();
      }, 100);
    }
  }
}
