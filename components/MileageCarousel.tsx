"use client";

import Carousel from "./ui/carousel";

type MileagePreviewPhotos = {
  src: string;
};

const MileageCarousel = () => {
  const mileageImages: MileagePreviewPhotos[] = [
    { src: "/images/mileage-preview/2N6A4532.jpg" },
    { src: "/images/mileage-preview/IMG_9999.jpg" },
    { src: "/images/mileage-preview/2N6A5242_2.jpg" },
    { src: "/images/mileage-preview/IMG_9637.jpg" },
    { src: "/images/mileage-preview/IMG_4242.jpg" },
    { src: "/images/mileage-preview/IMG_6229.jpg" },
    { src: "/images/mileage-preview/IMG_3387.jpg" },
    { src: "/images/mileage-preview/IMG_4281.jpg" },
    { src: "/images/mileage-preview/IMG_4341.jpg" },
    { src: "/images/mileage-preview/IMG_4211.jpg" },
    { src: "/images/mileage-preview/IMG_4390.jpg" },
    { src: "/images/mileage-preview/IMG_4618.jpg" },
    { src: "/images/mileage-preview/IMG_4655.jpg" },
    { src: "/images/mileage-preview/IMG_4677.jpg" },
    { src: "/images/mileage-preview/IMG_2901.jpg" },
    { src: "/images/IMG_0543.jpg" },
    { src: "/images/mileage-preview/IMG_3070.jpg" },
    { src: "/images/mileage-preview/IMG_0730.jpg" },
    { src: "/images/mileage-preview/IMG_3456.jpg" },
    { src: "/images/mileage-preview/IMG_3287.jpg" },
    { src: "/images/mileage-preview/IMG_3422.jpg" },
    { src: "/images/mileage-preview/IMG_3466.jpg" },
    { src: "/images/mileage-preview/IMG_3471.jpg" },
    { src: "/images/mileage-preview/IMG_3809.jpg" },
  ];

  return (
    <div className="relative overflow-hidden w-full h-full py-20 pt-10">
      <Carousel slides={mileageImages} />
    </div>
  );
};

export default MileageCarousel;
