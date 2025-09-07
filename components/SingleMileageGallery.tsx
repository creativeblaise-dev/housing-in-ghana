"use client";

import React, { useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { MileagePost } from "@/types";

const SingleMileageGallery = ({ slug }: { slug: string }) => {
  const {
    data: mileagePosts,
    isFetching,
    isError,
  } = useQuery({
    queryKey: ["mileage"],
    queryFn: () => fetch("/api/mileage").then((res) => res.json()),
    // Data is already available from server prefetch
  });

  const [selectedGallery, setSelectedGallery] = useState<MileagePost | null>(
    null
  );

  useEffect(() => {
    if (mileagePosts && !isFetching) {
      window.dispatchEvent(new CustomEvent("preline-reinit"));
      const foundGallery = mileagePosts.find(
        (gallery: { id: string }) => gallery.id === slug
      );
      setSelectedGallery(foundGallery || []);
    }
  }, [mileagePosts, isFetching]);

  if (isFetching) return <div>Loading...</div>;
  if (isError) return <div>Error loading posts</div>;

  if (!selectedGallery) return <div>No gallery found</div>;

  return (
    <>
      <div className="relative isolate overflow-hidden bg-[#313232] py-4 sm:py-24 px-10 lg:px-20 pb-10 lg:py-10 ">
        <div className="mx-auto max-w-7xl">
          <div className=" mx-auto grid justify-center items-center max-w-2xl  gap-x-8 gap-y-16 lg:max-w-none ">
            <div className="max-w-xl lg:max-w-lg text-center ">
              <h4 className="text-2xl font-semibold tracking-tight text-amber-200 mb-2">
                Mileage Gallery
              </h4>
              <h2 className="text-5xl font-semibold tracking-tight text-white ">
                Platinum Blue Island
              </h2>
              <div className="mt-3 text-md leading-8 text-gray-200">
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
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-4 ">
        <section className="py-10 px-10 lg:px-10 pb-10 lg:py-10 bg-[#fff5db] ">
          {/* Slider */}
          <div
            data-hs-carousel='{
    "loadingClasses": "opacity-0"
  }'
            className="relative"
          >
            <div className="hs-carousel flex flex-col md:flex-row gap-2">
              <div className="md:order-2 relative grow overflow-hidden min-h-96 bg-zinc-100 rounded-lg shadow-lg">
                <div className="hs-carousel-body absolute top-0 bottom-0 start-0 flex flex-nowrap transition-transform duration-700 opacity-0">
                  {selectedGallery.photos.map(
                    (photo: string, index: number) => (
                      <div className="hs-carousel-slide" key={index}>
                        <div className="flex justify-center h-full w-full bg-cover ">
                          <div
                            className="bg-cover bg-no-repeat w-full h-full"
                            style={{
                              backgroundImage: `url(${photo})`,
                              backgroundPosition: "center",
                            }}
                          ></div>
                        </div>
                      </div>
                    )
                  )}
                </div>

                <button
                  type="button"
                  className="hs-carousel-prev hs-carousel-disabled:opacity-50 hs-carousel-disabled:pointer-events-none absolute inset-y-0 start-0 inline-flex justify-center items-center w-11.5 h-full text-gray-800 hover:bg-gray-800/10 focus:outline-hidden focus:bg-gray-800/10 rounded-s-lg"
                >
                  <span className="text-2xl" aria-hidden="true">
                    <svg
                      className="shrink-0 size-5"
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d="m15 18-6-6 6-6"></path>
                    </svg>
                  </span>
                  <span className="sr-only">Previous</span>
                </button>
                <button
                  type="button"
                  className="hs-carousel-next hs-carousel-disabled:opacity-50 hs-carousel-disabled:pointer-events-none absolute inset-y-0 end-0 inline-flex justify-center items-center w-11.5 h-full text-gray-800 hover:bg-gray-800/10 focus:outline-hidden focus:bg-gray-800/10 rounded-e-lg"
                >
                  <span className="sr-only">Next</span>
                  <span className="text-2xl" aria-hidden="true">
                    <svg
                      className="shrink-0 size-5"
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d="m9 18 6-6-6-6"></path>
                    </svg>
                  </span>
                </button>
              </div>

              <div className="md:order-3 flex-none">
                <div className="hs-carousel-pagination max-h-100 flex flex-row md:flex-col gap-2 overflow-x-auto md:overflow-x-hidden md:overflow-y-auto">
                  {selectedGallery.photos.map(
                    (photo: string, index: number) => (
                      <div
                        key={index}
                        className="shadow-sm hs-carousel-pagination-item shrink-0 border border-gray-200 rounded-md overflow-hidden cursor-pointer size-30 md:size-30 hs-carousel-active:border-blue-400"
                      >
                        <div className="flex justify-center items-center text-center size-full bg-gray-200 p-1">
                          <div
                            style={{ backgroundImage: `url(${photo})` }}
                            className={`bg-cover bg-center bg-no-repeat w-full h-full`}
                          ></div>
                        </div>
                      </div>
                    )
                  )}
                </div>
              </div>
            </div>
          </div>
          {/* End Slider */}
        </section>
        <div></div>
      </div>
    </>
  );
};

export default SingleMileageGallery;
