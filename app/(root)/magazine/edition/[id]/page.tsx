import React from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { IconArrowRight } from "@tabler/icons-react";
import FeaturedArticles from "@/components/FeaturedArticles";
import { db } from "@/database/drizzle";
import { article } from "@/database/schema";
import { ArticleType } from "@/types";
import { eq, desc } from "drizzle-orm";
import Subscribe from "@/components/Subscribe";
import ArticlesVariantCards from "@/components/ArticlesVariantCards";

const page = async () => {
  const allArticles = (await db
    .select()
    .from(article)
    .where(eq(article.status, "published"))
    .orderBy(desc(article.createdAt))) as ArticleType[];

  return (
    <main className="">
      <section className="flex flex-col lg:flex-row h-auto bg-stone-100 gap-7 ">
        <div className="h-full flex-2">
          <div className="min-h-screen  relative isolate overflow-hidden bg-[#313232] py-8 sm:py-24 px-10 lg:px-5 lg:py-2 flex flex-col items-center justify-center">
            <div className="mx-auto max-w-5xl">
              <div className=" mx-auto grid justify-center items-center max-w-2xl  lg:max-w-none ">
                <div className="max-w-xl lg:max-w-lg text-center ">
                  <Image
                    src="/images/1st-Edition.webp"
                    alt="Edition Cover"
                    width={300}
                    height={600}
                    className="object-cover object-position-center -rotate-z-10 "
                  />
                </div>
              </div>
            </div>
            <div
              aria-hidden="true"
              className="absolute top-0 left-1/2 -z-10 -translate-x-1/2 blur-xs  xl:-top-20"
            >
              <div className="aspect-1155/678 w-288.75 bg-linear-to-tr from-[#ffffff] to-[#ff3b3b] opacity-90 bg-[url(/images/IMG_1229.jpg)]" />
            </div>
          </div>
        </div>
        <div className="flex-2 p-8">
          <div className="mb-4">
            <h1 className="text-4xl font-bold text-[#141516] mb-4 pt-4 text-balance">
              Housing In Ghana Magazine - <br />
              Edition <span className="text-[#FF202B]">#01</span>
            </h1>
            <p>
              Edition Release Date: <span className="italic">May, 2023</span>
            </p>
          </div>
          <h2 className="text-2xl font-bold text-[#141516] mb-2">
            Building the Foundation
          </h2>
          <p className="text-md text-stone-800 mt-4">
            Our debut edition set the tone for exploring Ghana’s vibrant real
            estate landscape. It featured insightful articles on housing trends,
            expert perspectives on property investment, and highlighted some of
            Ghana’s most attractive residential communities. This edition
            established the magazine as a trusted resource for industry
            knowledge, brand exposure, and lifestyle inspiration.
          </p>
          <div className="flex gap-3 mt-8">
            <Button className="bg-stone-800 cursor-pointer">Read Online</Button>
            <Button className="bg-stone-600 cursor-pointer">
              Download PDF
            </Button>
            <Link href="/contact-us">
              <Button className="bg-stone-400 cursor-pointer">
                Get a Printed Copy
              </Button>
            </Link>
          </div>
        </div>
      </section>
      <section className="flex flex-col lg:flex-row px-10 py-10 lg:px-10 pb-20 lg:py-10 bg-[#8b1c21]">
        <div className="flex-2 bg-white ">
          <div className=" lg:hidden flex justify-center h-60 w-full  sm:top-0 sm:h-screen">
            <Image
              src="/images/HIG MAG-interior.jpg"
              alt="editorial background image"
              width={600}
              height={400}
              className="object-cover object-center "
            />
          </div>
          <div className="p-8 border-r-1 border-stone-200 ">
            <h1 className="text-4xl font-bold text-[#141516] mb-4 pt-4 text-balance">
              Editorial Note
            </h1>
            <p className="text-md text-stone-800 mt-4">
              On behalf of our editorial team, I would like to express utmost
              gratitude to our contributors, sponsors, authors, anonymous
              reviewers and of course, our readers without whom this piece of
              work is but pieces of paper tucked together without a spine. A lot
              has gone on in the real estate industry in the past ten years and
              yet we wonder how much of this information is available to the
              average Ghanaian or visitors who tour the country from time to
              time.{" "}
            </p>
            <p className="text-md text-stone-800 mt-4">
              The Housing in Ghana Magazine comes to solve that problem by
              becoming the trusted resource material for real estate development
              in Ghana. The Magazine will be published quarterly with particular
              emphasis on providing relevant and up-to-date news of the real
              estate market.
            </p>
            <p className="text-sm font-bold text-slate-700 mt-4">
              Want to Read More? Get the edition{" "}
              <span>
                <Link href="#">
                  <IconArrowRight className="inline-block size-8 " />
                </Link>
              </span>
            </p>
          </div>
        </div>
        <div className="lg:relative flex-2 items-center  bg-[#FF202B]">
          <Image
            src="/images/HIG MAG-interior.jpg"
            alt="editorial background image"
            layout="fill"
            className="object-cover hidden lg:block"
          />
        </div>
      </section>
      <section>
        <ArticlesVariantCards
          header="Featured Articles"
          featureArticles={allArticles}
        />
      </section>
      <section className="md:px-20 md:mb-10">
        <Subscribe />
      </section>
    </main>
  );
};

export default page;
