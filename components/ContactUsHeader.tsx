"use client";
import { motion } from "motion/react";
import React from "react";
import { ImagesSlider } from "./ui/images-slider";
import { getImageUrl } from "@/lib/image-utils";

const ContactUsHeader = () => {
  const images = [getImageUrl("/images/3220.jpg")];
  return (
    <ImagesSlider
      className="h-[23rem] -mt-24 pt-28 pb-12 px-10"
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
        className="z-50 flex flex-col justify-center lg:px-20 items-center"
      >
        <motion.h1 className="font-bold text-3xl lg:text-5xl bg-clip-text text-transparent bg-gradient-to-b from-neutral-50 to-neutral-400 py-4">
          Contact Us
        </motion.h1>
        <motion.p className="text-stone-400 text-balance text-center">
          At Housing In Ghana, we value open communication and believe great
          connections <br /> start with a conversation. Reach out — we’d love to
          hear from you.
        </motion.p>
      </motion.div>
    </ImagesSlider>
  );
};

export default ContactUsHeader;
