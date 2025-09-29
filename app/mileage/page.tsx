"use client";

import React from "react";
import MileageHeroDispaly from "@/components/MileageHeroDisplay";
import { OptimizedImage } from "@/components/OptimizedImage";
import Link from "next/link";
import ThreeDCard from "@/components/ThreeDCard";
import { Button } from "@/components/ui/button";
import LayoutGridFeature from "@/components/LayoutGridFeature";
import InfoCards from "@/components/InfoCards";

type LayoutImages = {
  id: number;
  content: string;
  className: string;
  thumbnail: string;
};

const cards: LayoutImages[] = [
  {
    id: 1,
    content: "",
    className: "md:col-span-1",
    thumbnail: "/images/IMG_3332.jpg",
  },
  {
    id: 2,
    content: "",
    className: "col-span-1",
    thumbnail: "/images/IMG_4328_2.jpg",
  },
  {
    id: 3,
    content: "",
    className: "col-span-1",
    thumbnail: "/images/mileage-preview/IMG_0375_2.jpg",
  },
  {
    id: 4,
    content: "",
    className: "md:col-span-2 ",
    thumbnail: "/images/IMG_3824.jpg",
  },
  {
    id: 5,
    content: "",
    className: "md:col-span-1",
    thumbnail: "/images/mileage-preview/IMG_9988_2.jpg",
  },
];

const Mileage = () => {
  return (
    <main className="flex min-h-screen flex-1 flex-col xs:px-1 ">
      <MileageHeroDispaly />
      <section className="flex md:gap-15 flex-col md:flex-row px-10 md:px-20 pb-10 md:py-5  bg-[#ffffff]">
        <div className=" md:flex-3 ">
          <h1 className="text-4xl font-bold text-[#141516] mb-4 pt-4 lg:pt-6 ">
            The Mileage Advantage
          </h1>
          <p className="text-md mb-4">
            When you advertise with Housing
            <span className="text-[#FF202B]"> In Ghana </span>, you’re not just
            placing an ad — you’re securing a space in a trusted platform that
            educates, informs, and inspires. Our content-driven approach means
            your brand is seen alongside valuable real estate advice, industry
            insights, and captivating stories that keep readers engaged.
          </p>
          <p className="text-md mb-4">
            Whether you’re launching a new development, promoting your services,
            or building brand authority, Mileage helps you achieve the
            visibility and recognition you deserve in Ghana’s competitive
            housing market.
          </p>
          <p className="text-md">
            Interested in learning more about how Mileage can elevate your
            brand?
            <span className="text-[#FF202B]">
              {" "}
              <Link href="/contact-us">Contact us today</Link>
            </span>{" "}
            to explore our advertising options and discover the difference that
            Mileage can make for your brand.
          </p>
        </div>
        <div className=" md:flex-1">
          <div className="flex justify-center ">
            <ThreeDCard image="/images/IMG_4297_2.jpg" />
          </div>
        </div>
      </section>
      <section className="flex gap-10 flex-col md:flex-row px-10 md:px-20 pb-10 lg:py-10  bg-[#ffffff]">
        <div className=" md:flex-3">
          <section className="flex gap-4">
            <div className="flex justify-center ">
              <OptimizedImage
                src="/images/mileage-preview/IMG_1242.jpg"
                width={400}
                height={200}
                alt="housing in ghana magazine mileage photo"
                className="border rounded-lg shadow-md shadow-stone-300 rotate-0"
              />
            </div>
            <div className="flex justify-center ">
              <OptimizedImage
                src="/images/mileage-preview/IMG_3596.jpg"
                width={400}
                height={600}
                alt="housing in ghana magazine mileage photo"
                className="border rounded-lg shadow-md shadow-stone-300 rotate-4"
              />
            </div>
            <div className="flex justify-center ">
              <OptimizedImage
                src="/images/mileage-preview/IMG_2845.jpg"
                width={400}
                height={600}
                alt="thousing in ghana magazine mileage photo"
                className="border rounded-lg shadow-md shadow-stone-300 rotate-0"
              />
            </div>
          </section>
        </div>
      </section>

      <section className="py-4 px-10 bg-zinc-200">
        <div className="flex flex-col justify-center pt-5">
          <h1 className="text-4xl text-center font-bold text-[#141516]  pt-4 text-balance">
            At Housing <span className="text-[#FF202B]"> In Ghana </span>,
            <br /> we understand the power of visibility.
          </h1>
          <p className="text-center text-md  text-stone-800 mt-4 text-balance">
            Whether you are a property developer, an interior design brand, a
            construction company,
            <br /> or a home services provider, Mileage ensures your message
            travels far and wide.
          </p>
        </div>
        <InfoCards />
        <div className="px-0 lg:px-20">
          <div className="flex flex-col justify-center pt-5">
            <h1 className="text-4xl  font-bold text-[#141516]  pt-4 text-balance">
              Mileage Gallery - From brand features in Housing
              <span className="text-[#FF202B]"> In Ghana </span> <br /> magazine
              to industry events, product launches, community engagements, and
              tourist attractions, our gallery captures the moments where
              visibility meets opportunity.
            </h1>
            <p className=" text-md  text-stone-800 mt-4 text-balance">
              Browse through the gallery and witness how we help businesses
              stand out, create memorable impressions, and build lasting
              relationships in Ghana’s housing and real estate landscape.
            </p>
          </div>
          <LayoutGridFeature images={cards} />
        </div>

        <div className="flex justify-center my-6">
          <Link href="/mileage/gallery">
            <Button className="bg-[#282828] text-zinc-300 text-md  hover:text-white hover:bg-[#232525] py-5 md:p-5 rounded-full w-auto cursor-pointer border-1 border-[#F6BB2A]">
              Browse Gallery
            </Button>
          </Link>
        </div>
      </section>
    </main>
  );
};

export default Mileage;
