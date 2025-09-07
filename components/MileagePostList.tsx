"use client";

import React from "react";
import { useQuery } from "@tanstack/react-query";
import { MileagePost } from "@/types";
import Image from "next/image";
import Link from "next/link";
import { IconArrowRight } from "@tabler/icons-react";

const MileagePostList = () => {
  const {
    data: mileage,
    isFetching,
    isError,
  } = useQuery({
    queryKey: ["mileage"],
    queryFn: () => fetch("/api/mileage").then((res) => res.json()),
    // Data is already available from server prefetch
  });

  if (isFetching) return <div>Loading...</div>;
  if (isError) return <div>Error loading posts</div>;

  return (
    <section className="grid grid-cols-1 gap-4 mt-10 lg:mt-0 lg:grid-cols-3 px-10 lg:px-20 pb-10 lg:py-10 ">
      {mileage.map(({ id, photos, placeName, region }: MileagePost) => (
        <div key={id} className=" flex gap-6 bg-[#ffffff] rounded-lg shadow-lg">
          <div className="relative flex-2 lg:flex-3">
            <Image
              src={`${photos[0]}`} // Display the first photo as a preview
              fill={true}
              alt=""
              className="rounded-l-lg"
            />
          </div>
          <div className=" flex-3 lg:flex-3 py-3">
            <h1 className="font-bold text-md pt-3">{placeName}</h1>
            <p className="text-md font-medium mb-4">{region}</p>
            <Link href={`/mileage/gallery/${id}`} className="text-sm">
              <div className="flex gap-2 items-center">
                View Photos
                <IconArrowRight stroke={1} />
              </div>
            </Link>
          </div>
        </div>
      ))}
    </section>
  );
};

export default MileagePostList;
