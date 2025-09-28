"use client";

import React from "react";
import { Card, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import Image from "next/image";
import Link from "next/link";
import { ArticleType } from "@/types";
import { capitalizeSentences, formatDate } from "@/lib/utils";
import { useQuery } from "@tanstack/react-query";
import { Button } from "@react-email/components";
import { IconCircleArrowRightFilled } from "@tabler/icons-react";
import Loader from "./Loader";

const BlogPreview = ({ header }: { header: string }) => {
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
    <section className="px-10 lg:px-20 pb-10 lg:py-10 bg-zinc-200">
      <div className="flex flex-row  md:w-2/3 ">
        <h1 className="text-4xl font-bold text-[#212121] mb-1 pt-0">
          {header}
        </h1>
      </div>
      <div className="grid lg:grid-cols-4 grid-cols-1 lg:grid-row gap-4 py-4">
        {allArticles
          .filter(
            (foundArticle: ArticleType) => foundArticle.status === "published"
          )
          .map(({ title, createdAt, featuredImageUrl, slug }: ArticleType) => {
            const createdAtDate = new Date(createdAt);

            return (
              <Card
                className=" w-full max-w-sm px-2.5 gap-2 pb-2 bg-transparent shadow-none border-none"
                key={slug}
              >
                <Link href={`/articles/${slug}`}>
                  <figure className=" pb-0 relative h-60 lg:h-40 ">
                    <Image
                      src={featuredImageUrl}
                      alt={title}
                      layout="fill"
                      objectFit="cover"
                      className="rounded-lg shadow"
                    />
                  </figure>
                </Link>
                <CardHeader className="py-2 px-0.1">
                  <small className=" text-stone-600">
                    {formatDate(createdAtDate)}
                  </small>
                  <CardTitle className="text-lg font-bold text-[#1f2020] leading-tight">
                    {allArticles && capitalizeSentences(title.toLowerCase())}
                  </CardTitle>
                </CardHeader>
                <CardFooter className="px-0.1 pt-2 flex items-center ">
                  <Link href={`/articles/${slug}`}>
                    <IconCircleArrowRightFilled className="h-6 w-6 hover:text-red-500" />
                  </Link>
                </CardFooter>
              </Card>
            );
          })}
      </div>
    </section>
  );
};

export default BlogPreview;
