import Image from "next/image";
import React from "react";

const SingleGallery = () => {
  return (
    <>
      <div className="relative isolate overflow-hidden bg-[#313232] py-8 sm:py-24 px-10 lg:px-20 pb-10 lg:py-20 ">
        <div className="mx-auto max-w-7xl">
          <div className=" mx-auto grid justify-center items-center max-w-2xl  gap-x-8 gap-y-16 lg:max-w-none ">
            <div className="max-w-xl lg:max-w-lg text-center ">
              <h4 className="text-2xl font-semibold tracking-tight text-white mb-2">
                Mileage Gallery
              </h4>
              <h2 className="text-5xl font-semibold tracking-tight text-white ">
                Platinum Blue Island
              </h2>
            </div>
          </div>
        </div>
        <div
          aria-hidden="true"
          className="absolute top-0 left-1/2 -z-10 -translate-x-1/2 blur-3xl xl:-top-6"
        >
          <div
            style={{
              clipPath:
                "polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)",
            }}
            className="aspect-1155/678 w-288.75 bg-linear-to-tr from-[#ffee59] to-[#ff5656] opacity-90 bg-[url(/images/mileage-preview/2N6A5473_2.jpg)]"
          />
        </div>
      </div>

      <section className="py-10 px-10 lg:px-60 pb-10 lg:py-10 bg-[#fff5db] ">
        {/* Slider */}
        <div
          data-hs-carousel='{
    "loadingClasses": "opacity-0"
  }'
          className="relative"
        >
          <div className="hs-carousel flex flex-col md:flex-row gap-2">
            <div className="md:order-2 relative grow overflow-hidden min-h-96 bg-white rounded-lg shadow-lg">
              <div className="hs-carousel-body absolute top-0 bottom-0 start-0 flex flex-nowrap transition-transform duration-700 opacity-0">
                <div className="hs-carousel-slide">
                  <div className="flex justify-center h-full w-full bg-gray-100 ">
                    <div className="bg-[url(/images/mileage-preview/2N6A5473_2.jpg)] bg-cover bg-center bg-no-repeat w-full h-full"></div>
                    {/* <span className="self-center text-4xl text-gray-800 transition duration-700">
                    First slide
                  </span> */}
                  </div>
                </div>
                <div className="hs-carousel-slide">
                  <div className="flex justify-center h-full bg-gray-200 p-6">
                    <span className="self-center text-4xl text-gray-800 transition duration-700">
                      Second slide
                    </span>
                  </div>
                </div>
                <div className="hs-carousel-slide">
                  <div className="flex justify-center h-full bg-gray-300 p-6">
                    <span className="self-center text-4xl text-gray-800 transition duration-700">
                      Third slide
                    </span>
                  </div>
                </div>
                <div className="hs-carousel-slide">
                  <div className="flex justify-center h-full bg-gray-100 p-6">
                    <span className="self-center text-4xl text-gray-800 transition duration-700">
                      Fourth slide
                    </span>
                  </div>
                </div>
                <div className="hs-carousel-slide">
                  <div className="flex justify-center h-full bg-gray-200 p-6">
                    <span className="self-center text-4xl text-gray-800 transition duration-700">
                      Fifth slide
                    </span>
                  </div>
                </div>
                <div className="hs-carousel-slide">
                  <div className="flex justify-center h-full bg-gray-300 p-6">
                    <span className="self-center text-4xl text-gray-800 transition duration-700">
                      Sixth slide
                    </span>
                  </div>
                </div>
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

            <div className="md:order-1 flex-none">
              <div className="hs-carousel-pagination max-h-96 flex flex-row md:flex-col gap-2 overflow-x-auto md:overflow-x-hidden md:overflow-y-auto">
                <div className="shadow-sm hs-carousel-pagination-item shrink-0 border border-gray-200 rounded-md overflow-hidden cursor-pointer size-20 md:size-32 hs-carousel-active:border-blue-400">
                  <div className="flex justify-center items-center text-center size-full bg-gray-100 p-2">
                    <div className="bg-[url(/images/mileage-preview/2N6A5473_2.jpg)] bg-cover bg-center bg-no-repeat w-full h-full"></div>
                  </div>
                </div>
                <div className="hs-carousel-pagination-item shrink-0 border border-gray-200 rounded-md overflow-hidden cursor-pointer size-20 md:size-32 hs-carousel-active:border-blue-400">
                  <div className="flex justify-center items-center text-center size-full bg-gray-200 p-2">
                    <span className="text-xs text-gray-800 transition duration-700">
                      Second slide
                    </span>
                  </div>
                </div>
                <div className="hs-carousel-pagination-item shrink-0 border border-gray-200 rounded-md overflow-hidden cursor-pointer size-20 md:size-32 hs-carousel-active:border-blue-400">
                  <div className="flex justify-center items-center text-center size-full bg-gray-300 p-2">
                    <span className="text-xs text-gray-800 transition duration-700">
                      Third slide
                    </span>
                  </div>
                </div>
                <div className="hs-carousel-pagination-item shrink-0 border border-gray-200 rounded-md overflow-hidden cursor-pointer size-20 md:size-32 hs-carousel-active:border-blue-400">
                  <div className="flex justify-center items-center text-center size-full bg-gray-100 p-2">
                    <span className="text-xs text-gray-800 transition duration-700">
                      Fourth slide
                    </span>
                  </div>
                </div>
                <div className="hs-carousel-pagination-item shrink-0 border border-gray-200 rounded-md overflow-hidden cursor-pointer size-20 md:size-32 hs-carousel-active:border-blue-400">
                  <div className="flex justify-center items-center text-center size-full bg-gray-200 p-2">
                    <span className="text-xs text-gray-800 transition duration-700">
                      Fifth slide
                    </span>
                  </div>
                </div>
                <div className="hs-carousel-pagination-item shrink-0 border border-gray-200 rounded-md overflow-hidden cursor-pointer size-20 md:size-32 hs-carousel-active:border-blue-400">
                  <div className="flex justify-center items-center text-center size-full bg-gray-300 p-2">
                    <span className="text-xs text-gray-800 transition duration-700">
                      Sixth slide
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* End Slider */}
      </section>
    </>
  );
};

export default SingleGallery;
