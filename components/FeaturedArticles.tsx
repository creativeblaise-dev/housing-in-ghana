import React from "react";
import { Card, CardHeader, CardTitle } from "@/components/ui/card";
import Image from "next/image";
import Link from "next/link";
import { ArticleType } from "@/types";
import { capitalizeSentences } from "@/lib/utils";

const FeaturedArticles = async ({
  header,
  featureArticles,
}: {
  header: string;
  featureArticles: ArticleType[];
}) => {
  return (
    <section className="px-10 lg:px-20 pb-10 lg:py-10 bg-[#fefee2]">
      <div className="flex flex-row gap-4  ">
        <h1 className="flex flex-1 text-4xl font-bold  text-[#141516] pt-0">
          {header}
        </h1>
        <p className="text-md text-stone-900 mt-4 flex flex-2 justify-end">
          Our feature articles deliver insights you can trust—from expert
          interviews and market analysis to lifestyle, design, and cultural
          highlights. Each edition goes beyond real estate to inspire readers
          with fresh perspectives on living and investing in Ghana.
        </p>
      </div>
      <div className="grid lg:grid-cols-4 grid-cols-1 lg:grid-row gap-4 py-4">
        {featureArticles &&
          featureArticles.map(
            (
              { title, createdAt, featuredImageUrl, slug }: ArticleType,
              index
            ) => {
              return (
                <Card className=" w-full max-w-sm p-3 pb-6 " key={index}>
                  <Link href={`/articles/${slug}`}>
                    <figure className=" pb-0 relative h-60 lg:h-40 ">
                      <Image
                        src={featuredImageUrl}
                        alt={title}
                        layout="fill"
                        objectFit="cover"
                        className="rounded-lg"
                      />
                    </figure>
                    <CardHeader className="p-2">
                      <small className=" text-stone-600">
                        {createdAt.toDateString()}
                      </small>
                      <CardTitle className="text-lg font-bold text-[#1f2020] text-balance">
                        {featureArticles &&
                          capitalizeSentences(title.toLowerCase())}
                      </CardTitle>
                    </CardHeader>
                  </Link>
                </Card>
              );
            }
          )}
      </div>
    </section>
  );
};

export default FeaturedArticles;
