"use client";

import DefaultCarousel from "@/components/ui/default-carousel";

type EditionCovers = {
  title: string;
  button: string;
  src: string;
  url: string;
};

const GalleryGroupCarousel = () => {
  const slideData: EditionCovers[] = [
    {
      title: "Housing In Ghana Magazine Edition 1",
      button: "See Edition #1",
      src: "/images/1st-Edition.webp",
      url: "/about",
    },
    {
      title: "Housing In Ghana Magazine Edition 2",
      button: "See Edition #2",
      src: "/images/2nd_Edition.webp",
      url: "",
    },
    {
      title: "Housing In Ghana Magazine Edition 3",
      button: "See Edition #3",
      src: "/images/3rd-EditionHIGMag.png",
      url: "",
    },
  ];
  return (
    <div className="relative overflow-hidden w-full h-full md:pb-20">
      <DefaultCarousel slides={slideData} positionIndex={1} />
    </div>
  );
};

export default GalleryGroupCarousel;
