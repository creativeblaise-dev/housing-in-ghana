import React, { useState, useEffect } from "react";
import { MileagePost } from "@/types";
import Image from "next/image";
import Link from "next/link";

const RelatedMileageGallery = ({
  relatedRegion,
  relatedId,
  allMileagePosts,
}: {
  relatedRegion: string;
  relatedId: string;
  allMileagePosts?: MileagePost[];
}) => {
  const [relatedGallery, setRelatedGallery] = useState<MileagePost[]>([]);

  useEffect(() => {
    const fetchRelatedGalleries = allMileagePosts?.filter((gallery) => {
      return gallery.region === relatedRegion && gallery.id !== relatedId;
    });

    setRelatedGallery(fetchRelatedGalleries || []);
  }, [relatedRegion, allMileagePosts, relatedId]);

  if (relatedGallery.length === 0) return null;

  return (
    <>
      <h1 className="text-2xl text-zinc-100 font-bold mb-2 text-center lg:text-left">
        Check other locations in {relatedRegion}
      </h1>
      <p className="text-md text-gray-200 mb-6 text-center lg:text-left">
        Explore the beauty of {relatedRegion} through these stunning locations.
        Get inspired for your next adventure!
      </p>
      <div className="grid lg:grid-cols-2 gap-6 lg:px-6">
        {relatedGallery.length > 0 &&
          relatedGallery
            .slice(0, 2)
            .filter((gallery: MileagePost) => {
              const { id } = gallery;
              return id !== relatedId;
            })
            .map((gallery: MileagePost) => {
              const { id, placeName, photos } = gallery;
              return (
                <div className="-rotate-2" key={id}>
                  <Link
                    className="group relative block rounded-xl focus:outline-hidden "
                    href={`/mileage/gallery/${id}`}
                  >
                    <div className="shrink-0 relative rounded-xl overflow-hidden w-full h-50 before:absolute before:inset-x-0 before:z-1 before:size-full before:bg-linear-to-t before:from-gray-900/70 border-2 border-[#dfdfdf96]">
                      <Image
                        className="size-full absolute top-0 start-0 object-cover"
                        src={photos[0]}
                        width={1000}
                        height={1000}
                        alt="mileage image"
                      />
                    </div>

                    <div className="absolute bottom-0 inset-x-0 z-10">
                      <div className="flex flex-col h-full p-4 sm:p-6">
                        <h3 className="text-xl lg:text-1xl font-semibold text-white group-hover:text-white/80 group-focus:text-white/80">
                          {placeName}
                        </h3>
                        {/* <p className="mt-2 text-white/80">
                              {content.substring(0, 100)}...
                            </p> */}
                      </div>
                    </div>
                  </Link>
                </div>
              );
            })}
      </div>

      <div className="mt-10 flex justify-end">
        <Link
          href="/mileage/gallery"
          className="inline-block bg-[#ffffff] hover:bg-[#dbdbdb] text-black font-semibold py-2 px-4 rounded-full shadow-lg  "
        >
          View All Galleries
        </Link>
      </div>
    </>
  );
};

export default RelatedMileageGallery;
