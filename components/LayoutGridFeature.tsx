"use client";

import { LayoutGrid } from "./ui/layout-grid";
import { LayoutImages } from "@/types";

const LayoutGridFeature = ({ images }: { images: LayoutImages[] }) => {
  return (
    <div className=" w-full ">
      <LayoutGrid cards={images} />
    </div>
  );
};

export default LayoutGridFeature;
