import React from "react";
import BlogPreview from "@/components/BlogPreview";
import Subscribe from "@/components/Subscribe";
import { ArticleType } from "@/types";
import { OptimizedImage } from "@/components/OptimizedImage";
import { db } from "@/database/drizzle";
import { article } from "@/database/schema";
import { eq, desc } from "drizzle-orm";

// const getArticles = async () => {
//   const response = await fetch("/api/articles");
//   return response.json() as Promise<ArticleType[]>;
// };

const Articles = async () => {
  // const queryClient = new QueryClient();

  // Prefetch on server
  // await queryClient.prefetchQuery({
  //   queryKey: ["articles"],
  //   queryFn: getArticles,
  // });

  const articles = await db
    .select()
    .from(article)
    .where(eq(article.status, "published"))
    .orderBy(desc(article.createdAt));

  const allArticles = articles as ArticleType[];

  return (
    <main>
      <div className="relative isolate overflow-hidden bg-stone-900 py-8 sm:py-24 px-10 lg:px-20 pb-10 lg:py-20 -mt-24 pt-28 ">
        <div className="mx-auto max-w-7xl">
          <div className=" mx-auto grid max-w-2xl grid-cols-1 gap-x-8 gap-y-16 lg:max-w-none lg:grid-cols-2 lg:items-center lg:pt-30">
            <div className="max-w-xl lg:max-w-lg">
              <h2 className="text-5xl font-semibold tracking-tight text-white mb-4">
                Insights, Trends & Inspiration for Ghana’s Housing Industry
              </h2>
              <p className=" text-stone-300 text-md text-balance ">
                Stay ahead with expert opinions, market updates, and practical
                tips designed to guide you through Ghana’s dynamic real estate
                landscape. Our articles are your go-to hub for stories that
                matter — from property investment strategies and home
                improvement advice to community spotlights and industry
                innovations.
              </p>
            </div>
            <div className="flex lg:top-50 lg:absolute lg:right-15 items-center">
              <OptimizedImage
                src="/images/15554.jpg"
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
      <div>
        <BlogPreview
          header="Read our Latest Articles"
          initialData={allArticles}
        />
      </div>
      <section className="md:px-20 md:mb-20">
        <Subscribe />
      </section>
    </main>
  );
};

export default Articles;
