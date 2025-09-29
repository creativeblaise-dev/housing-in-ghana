import React from "react";
import { OptimizedImage } from "@/components/OptimizedImage";
import {
  HydrationBoundary,
  QueryClient,
  dehydrate,
} from "@tanstack/react-query";
import { MileagePost } from "@/types";
import GalleryList from "@/components/admin/GalleryList";
import { db } from "@/database/drizzle";
import { mileagePosts } from "@/database/schema";

// const getMileagePosts = async () => {
//   const response = await fetch("/api/mileage");
//   return response.json() as Promise<MileagePost[]>;
// };

const Gallery = async () => {
  // const queryClient = new QueryClient();

  // Prefetch on server
  // await queryClient.prefetchQuery({
  //   queryKey: ["mileage"],
  //   queryFn: getMileagePosts,
  // });

  const mileage = await db.select().from(mileagePosts);

  const mileageGallery = mileage as MileagePost[];

  return (
    <>
      <div className="relative isolate overflow-hidden bg-amber-900 py-8 sm:py-24  lg:px-20 lg:py-20 -mt-24 pt-28 pb-12 px-10 ">
        <div className="mx-auto max-w-7xl lg:pt-20">
          <div className=" mx-auto grid max-w-2xl grid-cols-1 gap-x-8 gap-y-16 lg:max-w-none lg:grid-cols-2">
            <div className="max-w-xl lg:max-w-lg">
              <h2 className="text-5xl font-semibold tracking-tight text-white mb-4">
                Mileage Gallery. Showcasing Ghana, Showcasing Your Brand.
              </h2>
              <p className=" text-stone-300 text-md text-balance ">
                The Mileage Gallery is more than a travel diary — it’s proof of
                our mission in action. As we journey across Ghana, visiting
                vibrant cities, serene coastlines, historic landmarks, and
                hidden cultural treasures, we take the Housing In Ghana magazine
                with us.
              </p>
            </div>
            <div className="flex lg:top-20 lg:absolute lg:right-10 items-center">
              <OptimizedImage
                src="/images/m-collage.png"
                width={600}
                height={600}
                alt="magazine covers"
                className="rounded-lg"
              />
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
            className="aspect-1155/678 w-288.75 bg-linear-to-tr from-[#ff80b5] to-[#9089fc] opacity-30"
          />
        </div>
      </div>
      <section className="py-0">
        <GalleryList
          initialData={mileageGallery}
          header="Explore Ghana's Beauty"
          showSearch={true}
          itemsPerPage={12}
        />
      </section>
    </>
  );
};

export default Gallery;
