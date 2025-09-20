"use client";

import { usePathname } from "next/navigation";
import { useEffect } from "react";

// Optional third-party libraries
import $ from "jquery";
import _ from "lodash";
import noUiSlider from "nouislider";
import "datatables.net";
import "dropzone/dist/dropzone-min.js";
import * as VanillaCalendarPro from "vanilla-calendar-pro";

window._ = _;
window.$ = $;
window.jQuery = $;
window.DataTable = $.fn.dataTable;
window.noUiSlider = noUiSlider;
window.VanillaCalendarPro = VanillaCalendarPro;

// Preline UI
async function loadPreline() {
  return import("preline/dist/index.js");
}

export default function PrelineScript() {
  const path = usePathname();

  useEffect(() => {
    const initPreline = async () => {
      try {
        await loadPreline();
        
        // Wait a bit longer for DOM to be ready
        setTimeout(() => {
          if (window.HSStaticMethods) {
            window.HSStaticMethods.autoInit();
          }
        }, 200);
      } catch (error) {
        console.error("Failed to load Preline:", error);
      }
    };

    initPreline();
  }, []);

  useEffect(() => {
    // Reinitialize on route changes
    const reinitTimeout = setTimeout(() => {
      if (window.HSStaticMethods) {
        window.HSStaticMethods.autoInit();
      }
    }, 300);

    return () => clearTimeout(reinitTimeout);
  }, [path]);

  return null;
}