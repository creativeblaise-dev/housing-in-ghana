"use client";

import React from "react";
import { motion } from "framer-motion";
import { Button } from "./ui/button";

type Variants = {
  hidden: { [key: string]: any };
  visible: { [key: string]: any };
};

const IntroContent = () => {
  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.1,
      },
    },
  };

  const itemVariants: Variants = {
    hidden: {
      opacity: 0,
      y: 30,
      filter: "blur(4px)",
    },
    visible: {
      opacity: 1,
      y: 0,
      filter: "blur(0px)",
      transition: {
        duration: 0.8,
        ease: [0.42, 0, 0.58, 1], // cubic-bezier for easeInOut
      },
    },
  };

  const highlightVariants: Variants = {
    hidden: {
      opacity: 0,
      scale: 0.8,
      filter: "blur(4px)",
    },
    visible: {
      opacity: 1,
      scale: 1,
      filter: "blur(0px)",
      transition: {
        duration: 0.8,
        ease: [0.68, -0.55, 0.27, 1.55], // cubic-bezier for backOut
        delay: 0.3,
      },
    },
  };

  return (
    <>
      <div className="pt-5 md:col-start-1 md:col-end-3 md:w-130 h-100">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          <motion.h1
            className="mb-6 font-bold text-5xl lh-lg text-slate-100"
            variants={itemVariants}
          >
            <motion.span className="inline-block" variants={itemVariants}>
              Discover the ultimate guide to real estate
            </motion.span>
            <br />
            <motion.span
              className="text-[#FF202B] inline-block"
              variants={highlightVariants}
            >
              in Ghana
            </motion.span>
          </motion.h1>

          <motion.p
            className="mb-6 text-slate-100 text-md"
            variants={itemVariants}
          >
            Explore current trends, trusted listings, and industry insights for
            buyers, renters, investors—nationwide.
          </motion.p>

          <motion.div className="flex gap-3" variants={itemVariants}>
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Button className="bg-[#0b0b0b7c] border-2 border-[#ffffff] rounded-full text-zinc-300 text-md py-6 md:p-6 font-bold leading-normal  w-auto cursor-pointer">
                Get The Latest Edition
              </Button>
            </motion.div>
          </motion.div>
        </motion.div>
      </div>
      <div className="px-4 md:col-start-3"></div>
    </>
  );
};

export default IntroContent;
