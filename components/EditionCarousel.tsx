"use client";

import DefaultCarousel from "@/components/ui/default-carousel";
import { MagazineEdition } from "@/types";

const EditionCarousel = ({ magazine }: { magazine: MagazineEdition[] }) => {
  return (
    <div className="relative overflow-hidden w-full h-full md:pb-20">
      <DefaultCarousel slides={magazine} positionIndex={0} />
    </div>
  );
};

export default EditionCarousel;
