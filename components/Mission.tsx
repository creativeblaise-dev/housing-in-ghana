import React from "react";
import { cn } from "@/lib/utils";
import { Spotlight } from "./ui/spotlight";
import { OptimizedImage } from "./OptimizedImage";

const Mission = () => {
  return (
    <div className="relative flex pt-10 w-full overflow-hidden bg-[#151414] antialiased md:items-center md:justify-center px-10 md:px-20 pb-10 md:py-15 ">
      <div
        className={cn(
          "pointer-events-none absolute inset-0 [background-size:40px_40px] select-none"
        )}
      />

      <Spotlight
        className="-top-40 left-0 md:-top-20 md:left-10"
        fill="white"
      />
      <div className="relative  z-10 flex gap-8 flex-col md:flex-row  mx-auto w-full max-w-7xl p-4  ">
        <div className="md:flex-3">
          <h1 className="bg-opacity-50 bg-gradient-to-b from-neutral-50 to-neutral-400 bg-clip-text text-left text-4xl font-bold text-transparent mb-4 pt-4">
            Our Mission
          </h1>
          <p className="mb-6 text-slate-100 text-md text-balance ">
            To create a seamless resource hub that simplifies your real estate
            journey in Ghana. We aim to empower and inform individuals across
            the country with expert insights, practical advice, and up-to-date
            market trends, helping them navigate the dynamic world of real
            estate with confidence. Beyond information, we strive to foster
            transparency, trust, and professionalism in the housing sector by
            connecting buyers, sellers, developers, and service providers in one
            vibrant, resourceful marketplace. Our mission is to bridge the gap
            between opportunity and access—making property ownership,
            investment, and housing solutions more attainable for all Ghanaians,
            both locally and in the diaspora.
          </p>
          <p className="mb-6 text-slate-100 text-md text-balance">
            We are committed to promoting sustainable housing practices,
            advocating for affordable housing initiatives, and supporting
            industry growth through collaboration, innovation, and impactful
            storytelling.
          </p>
        </div>
        <div className="md:flex-2">
          <div className="flex justify-center md:pt-15">
            <OptimizedImage
              src="/images/magazine-page_2.png"
              height={1000}
              width={1000}
              alt="magazine page"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Mission;
