"use client";
import { motion } from "motion/react";
import React from "react";
import { ImagesSlider } from "./ui/images-slider";
import Link from "next/link";
import { Button } from "./ui/button";

const MileageHeroDispaly = () => {
  const images = [
    "/images/mileage-preview/2N6A5110.jpg",
    "/images/mileage-preview/IMG_0510_2.jpg",
    "/images/mileage-preview/IMG_4293-HDR_2.jpg",
  ];
  return (
    <ImagesSlider
      className="h-[35rem] -mt-24 pt-28 pb-12 px-10"
      images={images}
    >
      <motion.div
        initial={{
          opacity: 0,
          y: -80,
        }}
        animate={{
          opacity: 1,
          y: 0,
        }}
        transition={{
          duration: 0.6,
        }}
        className="z-50 flex flex-col justify-center lg:px-20 items-center "
      >
        <motion.h1 className="font-bold text-3xl lg:text-5xl text-center bg-clip-text text-transparent bg-gradient-to-b from-neutral-50 to-neutral-400 py-4">
          Mileage – Extending Your Reach <br /> Across Ghana
        </motion.h1>
        <Link href="/mileage/gallery">
          <Button className="bg-[#282828] text-zinc-300 text-md  hover:text-white hover:bg-[#232525] py-5 md:p-5 rounded-full w-auto cursor-pointer border-1 border-[#F6BB2A]">
            Browse Gallery
          </Button>
        </Link>
      </motion.div>
    </ImagesSlider>
  );
};

export default MileageHeroDispaly;
