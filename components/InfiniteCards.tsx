"use client";

import React from "react";
import { InfiniteMovingCards } from "@/components/ui/infinite-moving-cards";

const InfiniteCards = () => {
  return (
    <div className="max-h-max mt-10 rounded-sm flex flex-col antialiased bg-white dark:bg-black dark:bg-grid-white/[0.05] items-center justify-center relative overflow-hidden">
      <InfiniteMovingCards items={clients} direction="right" speed="slow" />
    </div>
  );
};

const clients = [
  {
    clientLogo: "/images/DG-light.svg",
    name: "Devtraco Group",
  },
  {
    clientLogo: "/images/DG-light.svg",
    name: "Devtraco Group",
  },
  {
    clientLogo: "/images/DG-light.svg",
    name: "Devtraco Group",
  },
  {
    clientLogo: "/images/DG-light.svg",
    name: "Devtraco Group",
  },
  {
    clientLogo: "/images/DG-light.svg",
    name: "Devtraco Group",
  },
  {
    clientLogo: "/images/DG-light.svg",
    name: "Devtraco Group",
  },
  {
    clientLogo: "/images/DG-light.svg",
    name: "Devtraco Group",
  },
  {
    clientLogo: "/images/DG-light.svg",
    name: "Devtraco Group",
  },
  {
    clientLogo: "/images/DG-light.svg",
    name: "Devtraco Group",
  },
  {
    clientLogo: "/images/DG-light.svg",
    name: "Devtraco Group",
  },
  {
    clientLogo: "/images/DG-light.svg",
    name: "Devtraco Group",
  },
  {
    clientLogo: "/images/DG-light.svg",
    name: "Devtraco Group",
  },
  {
    clientLogo: "/images/DG-light.svg",
    name: "Devtraco Group",
  },
  {
    clientLogo: "/images/DG-light.svg",
    name: "Devtraco Group",
  },
  {
    clientLogo: "/images/DG-light.svg",
    name: "Devtraco Group",
  },
];

export default InfiniteCards;
