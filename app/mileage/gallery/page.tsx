import React from "react";
import Image from "next/image";
import Link from "next/link";
import { IconArrowRight } from "@tabler/icons-react";

const Gallery = () => {
  return (
    <>
      <div className="relative isolate overflow-hidden bg-amber-900 py-8 sm:py-24 px-10 lg:px-20 pb-10 lg:py-20 ">
        <div className="mx-auto max-w-7xl">
          <div className=" mx-auto grid max-w-2xl grid-cols-1 gap-x-8 gap-y-16 lg:max-w-none lg:grid-cols-2">
            <div className="max-w-xl lg:max-w-lg">
              <h2 className="text-5xl font-semibold tracking-tight text-white ">
                Mileage Gallery — Showcasing Ghana, Showcasing Your Brand.
              </h2>
              <p className=" text-stone-300 text-md text-balance ">
                The Mileage Gallery is more than a travel diary — it’s proof of
                our mission in action. As we journey across Ghana, visiting
                vibrant cities, serene coastlines, historic landmarks, and
                hidden cultural treasures, we take the Housing In Ghana magazine
                with us.
              </p>
            </div>
            <div className="flex lg:top-2 lg:absolute lg:right-10 items-center">
              <Image
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
      <section className="py-4">
        <div className="flex flex-col justify-center ">
          <h1 className="text-4xl text-center font-bold text-[#141516]  pt-4 text-balance">
            Mileage is designed to connect two worlds <br /> — the beauty of
            Ghana’s destinations and <br /> the marketing power of the Housing
            <span className="text-[#FF202B]"> In Ghana </span>
            magazine.
          </h1>
          <p className="text-center text-md text-stone-800 mt-4 ">
            Every journey means more exposure for our advertisers, <br /> and
            every image shared inspires both travel and trust.
          </p>
        </div>
      </section>
      <section className="grid grid-cols-1 gap-4 mt-10 lg:mt-0 lg:grid-cols-3 px-10 lg:px-20 pb-10 lg:py-10 ">
        <div className=" flex gap-6 bg-[#fcf8e1] rounded-lg shadow-lg">
          <div className="relative flex-2 lg:flex-3">
            <Image
              src="/images/mileage-preview/IMG_9581_2.jpg"
              fill={true}
              alt=""
              className="rounded-l-lg"
            />
          </div>
          <div className=" flex-3 lg:flex-3 py-3">
            <h1 className="font-bold text-md pt-3">Aburi Gardens</h1>
            <p className="text-md font-medium mb-4">Eastern Region</p>
            <Link href="#" className="text-sm">
              <div className="flex gap-2 items-center">
                View Photos
                <IconArrowRight stroke={1} />
              </div>
            </Link>
          </div>
        </div>
        <div className=" flex gap-6 bg-[#fcf8e1] rounded-lg shadow-lg">
          <div className="relative flex-2 lg:flex-3 ">
            <Image
              src="/images/IMG_5615.jpg"
              fill={true}
              alt=""
              className="rounded-l-lg "
            />
          </div>
          <div className=" flex-3 lg:flex-3 py-3">
            <h1 className="font-bold text-md pt-3">Ridge Condos</h1>
            <p className="text-md font-medium mb-4">Ashanti Region</p>
            <Link href="#" className="text-sm">
              <div className="flex gap-2 items-center">
                View Photos
                <IconArrowRight stroke={1} />
              </div>
            </Link>
          </div>
        </div>
        <div className=" flex gap-6 bg-[#fcf8e1] rounded-lg shadow-lg">
          <div className="relative flex-2 lg:flex-3">
            <Image
              src="/images/mileage-preview/2N6A5473_2.jpg"
              fill={true}
              alt=""
              className="rounded-l-lg "
            />
          </div>
          <div className=" flex-3 lg:flex-3 py-3">
            <h1 className="font-bold text-md pt-3">Platinum Blue Island</h1>
            <p className="text-md font-medium mb-4">Volta Region</p>
            <Link href="#" className="text-sm">
              <div className="flex gap-2 items-center">
                View Photos
                <IconArrowRight stroke={1} />
              </div>
            </Link>
          </div>
        </div>
        <div className=" flex gap-6 bg-[#fcf8e1] rounded-lg shadow-lg">
          <div className="relative flex-2 lg:flex-3">
            <Image
              src="/images/mileage-preview/IMG_9581_2.jpg"
              fill={true}
              alt=""
              className="rounded-l-lg"
            />
          </div>
          <div className=" flex-3 lg:flex-3 py-3">
            <h1 className="font-bold text-md pt-3">Aburi Gardens</h1>
            <p className="text-md font-medium mb-4">Eastern Region</p>
            <Link href="#" className="text-sm">
              <div className="flex gap-2 items-center ">
                View Photos
                <IconArrowRight stroke={1} />
              </div>
            </Link>
          </div>
        </div>
        <div className=" flex gap-6 bg-[#fcf8e1] rounded-lg shadow-lg">
          <div className="relative flex-2 lg:flex-3 ">
            <Image
              src="/images/IMG_5615.jpg"
              fill={true}
              alt=""
              className="rounded-l-lg "
            />
          </div>
          <div className=" flex-3 lg:flex-3 py-3">
            <h1 className="font-bold text-md pt-3">Ridge Condos</h1>
            <p className="text-md font-medium mb-4">Ashanti Region</p>
            <Link href="#" className="text-sm">
              <div className="flex gap-2 items-center">
                View Photos
                <IconArrowRight stroke={1} />
              </div>
            </Link>
          </div>
        </div>
        <div className=" flex gap-6 bg-[#fcf8e1] rounded-lg shadow-lg">
          <div className="relative flex-2 lg:flex-3">
            <Image
              src="/images/mileage-preview/2N6A5473_2.jpg"
              fill={true}
              alt=""
              className="rounded-l-lg "
            />
          </div>
          <div className=" flex-3 lg:flex-3 py-3">
            <h1 className="font-bold text-md pt-3">Platinum Blue Island</h1>
            <p className="text-md font-medium mb-4">Volta Region</p>
            <Link href="#" className="text-sm">
              <div className="flex gap-2 items-center">
                View Photos
                <IconArrowRight stroke={1} />
              </div>
            </Link>
          </div>
        </div>
      </section>
    </>
  );
};

export default Gallery;
