import React from "react";
import { cn } from "@/lib/utils";
import { Spotlight } from "./ui/spotlight";
import BrandStats from "./BrandStats";

const Spotlighter = () => {
  return (
    <div className="relative flex pt-10 w-full overflow-hidden bg-[#232525] antialiased md:items-center md:justify-center">
      <div
        className={cn(
          "pointer-events-none absolute inset-0 [background-size:40px_40px] select-none"
        )}
      />

      <Spotlight
        className="-top-40 left-0 md:-top-20 md:left-150"
        fill="white"
      />
      <div className="relative z-10 mx-auto w-full max-w-7xl p-4 pt-20 md:pt-0">
        <h1 className="bg-opacity-50 bg-gradient-to-b from-neutral-50 to-neutral-400 bg-clip-text text-center text-4xl font-bold text-transparent mb-4 pt-4">
          Our Proven Performance in Ghana’s Real Estate Space <br /> Trusted
          Reach. Measurable Growth.
        </h1>
        <BrandStats />
      </div>
    </div>
  );
};

export default Spotlighter;
