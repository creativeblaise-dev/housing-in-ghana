import React from "react";
import { cn } from "@/lib/utils";
import { Spotlight } from "./ui/spotlight";
import { Button } from "./ui/button";
import Link from "next/link";
import Image from "next/image";

const SpotlightPreview = () => {
  return (
    <div className="relative flex h-[30rem] md:h-[40rem] w-full overflow-hidden bg-black/[0.96] antialiased md:items-center md:justify-center">
      <div
        className={cn(
          "pointer-events-none absolute inset-0 [background-size:cover] [background-position:center] select-none",
          "[background-image:url('/images/devtraco-pelican.jpg')]"
        )}
      />
      <div className="absolute top-0 w-full h-full inset-0 bg-gradient-to-b from-black to-stone-800 opacity-80 flex items-end justify-center "></div>

      <Spotlight
        className="-top-40 left-0 md:-top-40 md:left-60"
        fill="white"
      />
      <div className="relative z-10 mx-auto w-full max-w-7xl p-4 pt-20 md:pt-20 md:pb-20">
        <h1 className="bg-opacity-50 bg-gradient-to-b from-[#FFFFFF] to-neutral-400 bg-clip-text text-center text-4xl font-bold text-transparent md:text-6xl">
          Brand Spotlight
        </h1>
        <p className="mx-auto mt-4 max-w-lg text-center text-base font-normal text-neutral-300">
          Shining a light on one of the standout brands shaping Ghana’s real
          estate industry.
        </p>

        <div className="grid grid-col justify-center mt-6">
          <div className="flex justify-center py-6 ">
            <Image
              src="/images/DG-light.svg"
              width={150}
              height={100}
              alt="brand spotlight image"
            />
          </div>
          <div className="flex mt-4">
            <Link href="/">
              <Button className="bg-[#FF202B] text-white text-md  py-7 md:p-7 font uppercase w-auto cursor-pointer border-1 border-[#FF202B]">
                View Brand Spotlight
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SpotlightPreview;
