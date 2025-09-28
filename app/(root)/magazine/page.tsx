import React from "react";
import { cn } from "@/lib/utils";
import { Spotlight } from "@/components/ui/spotlight";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import LayoutGridFeature from "@/components/LayoutGridFeature";
import EditionCarousel from "@/components/EditionCarousel";
import Subscribe from "@/components/Subscribe";
import Link from "next/link";
import { LayoutImages } from "@/types";
import { db } from "@/database/drizzle";
import { magazineEditions } from "@/database/schema";
import { desc } from "drizzle-orm";

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
    thumbnail: "/images/IMG_0897.jpg",
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

const Magazine = async () => {
  const editions = await db
    .select()
    .from(magazineEditions)
    .orderBy(magazineEditions.releasedAt);

  return (
    <main>
      <div className="relative flex w-full overflow-hidden bg-[url('/images/modern-home.jpg')] bg-center [background-size:cover] antialiased md:items-center md:justify-center -mt-24 pt-28 pb-12 px-10 md:px-20 md:py-15 ">
        <div
          className={cn(
            "pointer-events-none absolute inset-0 bg-[#111111d9]  select-none"
          )}
        />

        <Spotlight
          className="-top-40 left-0 md:-top-20 md:left-10"
          fill="white"
        />
        <div className="relative  z-10 flex gap-5 flex-col md:flex-row  mx-auto w-full max-w-7xl lg:pt-20 ">
          <div className="md:flex-3">
            <h1 className="bg-opacity-50 bg-gradient-to-b from-white to-neutral-400 bg-clip-text text-left text-5xl font-bold text-transparent mb-4 pt-2">
              Dive into the pages of <br /> Housing
              <span className="text-[#FF202B] text-shadow-cyan-100 ">
                {" "}
                In Ghana{" "}
              </span>
              Magazine
            </h1>
            <p className=" text-stone-300 text-md text-balance mb-4">
              Editions packed with market insights, legal guidance, design
              inspiration, and developer spotlights shaping the nation’s
              property landscape. With nationwide distribution, our yearly
              publication connects thousands of readers to opportunities,
              trends, and trusted voices in Ghana’s real estate industry. We
              cover a wide range of topics, including home staging, interior
              design, mortgage financing, property management, investment
              strategies, and much more.
            </p>

            <div className="mt-6">
              <Link href="/magazine/edition/03">
                <Button className="bg-[#FF202B] rounded-full text-white text-md hover:text-black hover:bg-[#e6d30a] py-5 md:p-5 font-semibold w-auto cursor-pointer ">
                  Get The Lastest Edition
                </Button>
              </Link>
            </div>
          </div>
          <div className="md:flex-2">
            <div className="flex justify-center md:pt-1 ">
              <Image
                src="/images/IMG_4354_2.jpg"
                height={400}
                width={290}
                alt="magazine edition"
                className="rotate-3 rounded-lg"
              />
            </div>
          </div>
        </div>
      </div>

      <section className="flex flex-col px-10 gap-4 md:px-20 pb-10 md:py-10  lg:flex-row">
        <div className="md:flex-1/2">
          <h1 className="text-4xl  font-bold text-[#141516]  pt-4 text-balance mb-4">
            Explore each edition’s unique journey through innovation, insight,
            and inspiration."
          </h1>
          <p className=" text-md  text-stone-800 mt-4 text-balance">
            Housing <span className="text-[#FF202B]"> In Ghana</span> Magazine
            is more than a publication — it’s a gateway to opportunity,
            lifestyle, and discovery. Each edition blends powerful brand
            spotlights that showcase top developers, property services, and
            market leaders with practical, expert-backed real estate advice
            tailored to both seasoned investors and first-time buyers.
          </p>
          <p className=" text-md  text-stone-800 mt-4 text-balance">
            Beyond property, the magazine takes readers on a journey through
            Ghana’s most captivating tourist destinations, from serene coastal
            retreats to bustling cultural hubs, encouraging exploration and
            celebrating the country’s rich heritage.
          </p>
        </div>
        <div className="md:flex-1/2">
          <EditionCarousel magazine={editions} />
        </div>
      </section>
      <section className="py-4">
        <div className="flex flex-col justify-center">
          <h1 className="text-4xl text-center font-bold text-[#141516]  pt-4 text-balance">
            From cozy cafés to bustling offices, people everywhere are diving
            into Housing <span className="text-[#FF202B]">In Ghana </span>
            Magazine.
          </h1>
          <p className="text-center text-md  text-stone-800 mt-4 text-balance">
            Join the growing community discovering insights, inspiration, <br />
            and opportunities in every edition."
          </p>
        </div>
        <div className="px-20">
          <LayoutGridFeature images={cards} />
        </div>
      </section>
      <section className="md:px-20 md:mb-20">
        <Subscribe />
      </section>
    </main>
  );
};

export default Magazine;
