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
    clientLogo: "/images/clients/devtracoplus_logo_298_x_125_-01.png",
    name: "Crown Lusso",
  },
  {
    clientLogo: "/images/clients/header-logo_lrg.png",
    name: "FBN",
  },
  {
    clientLogo: "/images/clients/WHITEWALL-LOGO-copy-removebg-preview.png",
    name: "Devtraco Group",
  },
  {
    clientLogo: "/images/clients/Logo-01.png",
    name: "Devtraco Group",
  },
  {
    clientLogo: "/images/clients/cropped-logo11-01-1110x399.png",
    name: "Devtraco Group",
  },
  {
    clientLogo: "/images/clients/1-780x456_prev_ui.png",
    name: "Devtraco Group",
  },
  {
    clientLogo: "/images/clients/springtime-logo-colorful@3x-1.png",
    name: "Devtraco Group",
  },
  {
    clientLogo: "/images/clients/Alzu-Shops-removebg-preview.png",
    name: "Devtraco Group",
  },
  {
    clientLogo: "/images/clients/cropped-logo11-01-1110x399.png",
    name: "Devtraco Group",
  },
  {
    clientLogo: "/images/clients/trellidor-logo-2-1.png",
    name: "Devtraco Group",
  },
  {
    clientLogo: "/images/clients/indigohomes-logo.png",
    name: "Devtraco Group",
  },
  {
    clientLogo: "/images/clients/logo.png",
    name: "Devtraco Group",
  },
  {
    clientLogo: "/images/clients/RMK_New_logo_240_realtor.png",
    name: "Devtraco Group",
  },
];

export default InfiniteCards;
