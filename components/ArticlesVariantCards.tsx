"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { ArticleType } from "@/types";
import { Button } from "@/components/ui/button";
import { Spotlight } from "@/components/ui/spotlight";
import { capitalizeSentences, cn } from "@/lib/utils";
import { useQuery } from "@tanstack/react-query";
import Loader from "@/components/Loader";

const ArticlesVariantCards = ({ header }: { header: string }) => {
  const {
    data: allArticles,
    isFetching,
    isError,
  } = useQuery({
    queryKey: ["articles"],
    queryFn: () => fetch("/api/articles").then((res) => res.json()),
    // Data is already available from server prefetch
  });

  if (isFetching) return <Loader />;
  if (isError) return <div>Error loading posts</div>;
  return (
    <>
      <div className="relative flex pt-5 w-full overflow-hidden bg-[url('/images/prydumano-design-vIbxvHj9m9g-unsplash.jpg')] bg-center [background-size:cover] antialiased md:items-center md:justify-center px-10 md:px-20 pb-10 md:py-15 ">
        <div
          className={cn(
            "pointer-events-none absolute inset-0 bg-[#1b1b1bc3]  select-none"
          )}
        />

        <Spotlight
          className="-top-40 left-0 md:-top-20 md:left-10"
          fill="white"
        />
        <div className="relative z-10  mx-auto w-full max-w-7xl  ">
          <h1 className="text-4xl font-bold text-[#efefef] mb-4 pt-4">
            {header}
          </h1>
          {/* Card Blog */}
          <div className="max-w-[85rem] px-4 py-10 sm:px-6 lg:px-0 lg:py-8 mx-auto">
            {/* Grid */}
            <div className="grid lg:grid-cols-3 gap-6">
              {/* Card */}

              {allArticles
                .filter(
                  (foundArticle: ArticleType) =>
                    foundArticle.status === "published"
                )
                .map(
                  ({
                    title,
                    createdAt,
                    featuredImageUrl,
                    slug,
                    category,
                  }: ArticleType) => {
                    const createdAtDate = new Date(createdAt);
                    return (
                      <Link
                        key={slug}
                        className="group relative block rounded-xl focus:outline-hidden"
                        href={`/articles/${slug}`}
                      >
                        <div className="shrink-0 relative rounded-xl overflow-hidden w-full h-67.5 before:absolute before:inset-x-0 before:z-1 before:size-full before:bg-linear-to-t before:from-stone-900/90 border-2 border-[#dfdfdf96]">
                          <Image
                            className="size-full absolute top-0 start-0 object-cover"
                            src={featuredImageUrl}
                            width={1000}
                            height={1000}
                            alt={title}
                          />
                        </div>

                        <div className="absolute top-0 inset-x-0 z-10">
                          <div className="p-4 flex flex-col h-full sm:p-6">
                            <div className="flex items-center">
                              <div className="ms-2.5 sm:ms-4">
                                <h4 className=" text-white text-xs leading-relaxed px-3 py-1.5 bg-[#ff202bb9] rounded-full inline-block  ">
                                  {category}
                                </h4>
                              </div>
                            </div>
                            {/* End Avatar */}
                          </div>
                        </div>

                        <div className="absolute bottom-0 inset-x-0 z-10">
                          <div className="flex flex-col h-full p-4 sm:p-6">
                            <h3 className="text-xl lg:text-1xl font-semibold leading-tight text-white group-hover:text-white/80 group-focus:text-white/80">
                              {capitalizeSentences(title.toLowerCase())}
                            </h3>
                            <p className="text-xs text-white/80 mt-3">
                              {" "}
                              {createdAtDate.toDateString()}
                            </p>
                            {/* <p className="mt-2 text-white/80">
                              {content.substring(0, 100)}...
                            </p> */}
                          </div>
                        </div>
                      </Link>
                    );
                  }
                )}
              {/* End Card */}
            </div>
            {/* End Grid */}
          </div>

          {/* End Card Blog */}
          <div className="flex justify-end">
            <Link href="/articles">
              <Button className="bg-zinc-200 text-stone-800 cursor-pointer hover:bg-zinc-300 rounded-full">
                Read Our Articles
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default ArticlesVariantCards;
