"use client";

import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { getImageUrl } from "@/lib/image-utils";

type Variants = {
  hidden: { [key: string]: any };
  visible: { [key: string]: any };
};

const AnnouncementBanner = () => {
  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.3,
        delayChildren: 0.1,
      },
    },
  };

  const slideInFromRight: Variants = {
    hidden: {
      opacity: 0,
      x: 50,
      filter: "blur(2px)",
    },
    visible: {
      opacity: 1,
      x: 0,
      filter: "blur(0px)",
      transition: {
        duration: 0.8,
        ease: [0.25, 0.46, 0.45, 0.94],
      },
    },
  };

  const buttonVariants: Variants = {
    hidden: {
      opacity: 0,
      x: 30,
      scale: 0.9,
    },
    visible: {
      opacity: 1,
      x: 0,
      scale: 1,
      transition: {
        duration: 0.6,
        ease: "backOut",
      },
    },
  };

  const backgroundImageUrl = getImageUrl("/images/banner-bg-2.png");

  return (
    <div className="max-w-[100%] px-0 sm:px-6 lg:px-0 mx-auto">
      <div
        style={{ backgroundImage: `url(${backgroundImageUrl})` }}
        className="bg-stone-600  bg-no-repeat bg-cover bg-center p-4 rounded-none text-center overflow-hidden"
      >
        <motion.div
          className="flex flex-wrap justify-center items-center gap-2"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          <motion.p
            className="inline-block text-white"
            variants={slideInFromRight}
          >
            Our 4th Edition is Coming Soon! Stay Tuned.
          </motion.p>

          <motion.div variants={buttonVariants}>
            <motion.div
              whileHover={{
                scale: 1.05,
                transition: { duration: 0.2 },
              }}
              whileTap={{ scale: 0.95 }}
            >
              <Link
                className="py-1.5 px-2.5 md:py-2 md:px-3 inline-flex items-center gap-x-2 text-sm font-medium rounded-full border-2 border-white text-white hover:border-white/70 hover:text-white/70 focus:outline-hidden focus:border-white/70 focus:text-white/70 disabled:opacity-50 disabled:pointer-events-none transition-all duration-300"
                href="/magazine"
              >
                Learn more
                <motion.svg
                  className="shrink-0 size-4"
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  whileHover={{ x: 2 }}
                  transition={{ duration: 0.2 }}
                >
                  <path d="m9 18 6-6-6-6" />
                </motion.svg>
              </Link>
            </motion.div>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
};

export default AnnouncementBanner;
