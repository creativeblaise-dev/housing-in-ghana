"use client";

import React, { useState, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { MileagePost } from "@/types";
import Image from "next/image";
import Link from "next/link";
import RelatedMileageGallery from "./RelatedMileageGallery";

const SimpleCarousel = ({ slug }: { slug: string }) => {
  const [currentSlide, setCurrentSlide] = useState(0);

  const [selectedGallery, setSelectedGallery] = useState<MileagePost | null>(
    null
  );

  const {
    data: mileagePosts,
    isFetching,
    isError,
  } = useQuery({
    queryKey: ["mileage"],
    queryFn: () => fetch("/api/mileage").then((res) => res.json()),
    // Data is already available from server prefetch
  });

  useEffect(() => {
    if (mileagePosts && !isFetching) {
      const foundGallery = mileagePosts.find(
        (gallery: { id: string }) => gallery.id === slug
      );
      setSelectedGallery(foundGallery || []);
    }
  }, [mileagePosts, isFetching]);

  if (isFetching) return <div>Loading...</div>;
  if (isError) return <div>Error loading posts</div>;

  if (!selectedGallery) return <div>No gallery found</div>;

  const photo = selectedGallery.photos[currentSlide];
  const locationName = selectedGallery.placeName;

  return (
    <section className="bg-[#fffdeb]">
      <div className="relative isolate overflow-hidden bg-[#313232] py-4 sm:py-24  lg:px-20 lg:py-10 -mt-24 pt-28 pb-12 px-10 ">
        <div className="mx-auto max-w-7xl">
          <div className=" mx-auto grid justify-center items-center max-w-2xl  gap-x-8 gap-y-16 lg:max-w-none ">
            <div className="max-w-xl lg:max-w-lg text-center lg:pt-20">
              <h4 className="text-2xl font-semibold tracking-tight text-amber-200 mb-2">
                Mileage Gallery
              </h4>
              <h2 className="text-5xl font-semibold tracking-tight text-white ">
                {locationName}
              </h2>
              <div className="mb-4 mt-2 text-md text-gray-200">
                {selectedGallery.description}
              </div>
            </div>
          </div>
        </div>
        <div
          aria-hidden="true"
          className="absolute top-0 left-1/2 -z-10 -translate-x-1/2 blur-3xl xl:-top-6"
        >
          <div
            style={{
              backgroundImage: `url(${selectedGallery.photos[0]})`,
            }}
            className="aspect-1155/678 w-288.75 bg-linear-to-tb from-[#ffee59] to-[#ff5656] opacity-100"
          />
        </div>
        <div className="grid lg:grid-cols-2 lg:px-10 lg:py-10 gap-20">
          <div
            className="lg:col-start-1 lg:col-end-2 relative overflow-hidden min-h-96 bg-[#161616] rounded-lg shadow-lg"
            style={{
              backgroundImage: `url(${photo})`,
              backgroundPosition: "center",
              backgroundSize: "cover",
            }}
          >
            <div className="absolute inset-0 bg-black/80" />
            <div
              className="flex transition-transform duration-700 ease-in-out"
              style={{ transform: `translateX(-${currentSlide * 100}%)` }}
            >
              {selectedGallery.photos.map((photo: string, index: number) => (
                <div key={index} className="w-full flex-shrink-0">
                  <div
                    className="bg-contain bg-no-repeat w-full h-96 "
                    style={{
                      backgroundImage: `url(${photo})`,
                      backgroundPosition: "center",
                    }}
                  />
                </div>
              ))}
            </div>

            {/* Navigation buttons */}
            <button
              onClick={() =>
                setCurrentSlide((prev) =>
                  prev === 0 ? selectedGallery.photos.length - 1 : prev - 1
                )
              }
              className="absolute left-2 top-1/2 transform -translate-y-1/2 bg-black/60 text-white p-2 rounded"
            >
              ←
            </button>
            <button
              onClick={() =>
                setCurrentSlide((prev) =>
                  prev === selectedGallery.photos.length - 1 ? 0 : prev + 1
                )
              }
              className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-black/60 text-white p-2 rounded"
            >
              →
            </button>
          </div>
          <div className="lg:col-start-2 lg:col-end-3 ">
            <RelatedMileageGallery
              relatedRegion={selectedGallery.region}
              relatedId={selectedGallery.id}
              allMileagePosts={mileagePosts}
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default SimpleCarousel;
