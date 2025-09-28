import React from "react";
import { db } from "@/database/drizzle";
import { article as articleTable } from "@/database/schema";
import { eq, ne } from "drizzle-orm";
import { ArticleType } from "@/types";
import Image from "next/image";
import Link from "next/link";
import { capitalizeSentences, formatDate } from "@/lib/utils";
import { RichTextRenderer } from "@/components/RichTextRenderer"; // Updated import

const ArticleContentPage = async ({
  params,
}: {
  params: Promise<{ slug: string }>;
}) => {
  const { slug } = await params;

  const otherArticles = await db
    .select()
    .from(articleTable)
    .where(ne(articleTable.slug, slug))
    .limit(4);

  const [articles] = await db
    .select()
    .from(articleTable)
    .where(eq(articleTable.slug, slug))
    .limit(1);

  const article = articles as ArticleType;

  return (
    <main>
      {/* Blog Article */}
      <div className="max-w-[85rem] px-4 sm:px-6 lg:px-8 mx-auto">
        <div className="grid lg:grid-cols-3 gap-y-8 lg:gap-y-0 lg:gap-x-6">
          {/* Content */}
          <div className="lg:col-span-2">
            <div className="py-8 lg:pe-8">
              <div className="space-y-5 lg:space-y-8">
                <Link
                  className="inline-flex items-center gap-x-1.5 text-sm text-gray-600 decoration-2 hover:underline focus:outline-hidden focus:underline dark:text-blue-500"
                  href="/articles"
                >
                  <svg
                    className="shrink-0 size-4"
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="m15 18-6-6 6-6" />
                  </svg>
                  Back to Articles
                </Link>

                <h2 className="text-3xl font-bold lg:text-5xl dark:text-white">
                  {article && capitalizeSentences(article?.title.toLowerCase())}
                </h2>

                <section className="flex gap-6">
                  <div className="flex flex-1 items-center gap-x-5">
                    <div className="inline-flex items-center gap-1.5 py-1 px-3 sm:py-2 sm:px-4 rounded-full text-xs sm:text-sm bg-gray-100 text-gray-800 hover:bg-gray-200 focus:outline-hidden focus:bg-gray-200 dark:bg-neutral-800 dark:text-neutral-200 dark:hover:bg-neutral-800 dark:focus:bg-neutral-800">
                      {article?.category}
                    </div>
                  </div>
                  <div className="flex flex-2 justify-end items-center gap-x-1.5">
                    <div className="block h-3 border-e border-gray-300 mx-3 dark:border-neutral-600"></div>
                    <p className="text-xs sm:text-sm text-gray-800 dark:text-neutral-200">
                      Last Updated: {formatDate(new Date(article?.updatedAt))}
                    </p>
                  </div>
                </section>

                <figure>
                  <Image
                    className="w-full object-cover rounded-xl"
                    width={1200}
                    height={600}
                    src={article?.featuredImageUrl || ""}
                    alt={article?.title || ""}
                  />
                </figure>

                <p className="text-lg italic font-bold text-gray-900 leading-relaxed">
                  {article?.excerpt}
                </p>
                <div id="article-content" className="prose">
                  <RichTextRenderer content={article?.content || []} />
                </div>

                <div className="flex flex-col lg:flex-row lg:justify-between lg:items-center gap-y-5 lg:gap-y-0">
                  {/* Badges/Tags */}
                  <div>
                    {article &&
                      article.tags &&
                      article.tags.map((tag, index) => (
                        <div
                          key={index}
                          className="m-0.5 inline-flex items-center gap-1.5 py-2 px-3 rounded-full text-sm bg-slate-600 text-zinc-200 hover:bg-gray-200 hover:text-stone-900 focus:outline-hidden focus:bg-gray-200 dark:bg-neutral-800 dark:text-neutral-200 dark:hover:bg-neutral-700 dark:focus:bg-neutral-700"
                        >
                          {tag}
                        </div>
                      ))}
                  </div>
                  {/* End Badges/Tags */}
                </div>
              </div>
            </div>
          </div>
          {/* End Content */}

          {/* Sidebar */}
          <div className="lg:col-span-1 lg:w-full lg:h-full lg:bg-linear-to-r lg:from-gray-50 lg:via-transparent lg:to-transparent dark:from-neutral-800">
            <div className="sticky top-0 start-0 py-8 lg:ps-8">
              <h3 className="px-4 text-2xl font-bold text-gray-600 dark:text-white mb-6">
                Other Insightful Articles
              </h3>
              <div className="px-2">
                {otherArticles.length > 0 &&
                  otherArticles.map((article) => (
                    <div
                      className="space-y-4 px-2 py-2 mb-4 bg-[#ffffff] "
                      key={article.id}
                    >
                      <Link
                        className="group flex items-center gap-x-6 focus:outline-hidden"
                        href={`/articles/${article.slug}`}
                      >
                        <div className="shrink-0 relative rounded-lg overflow-hidden size-20">
                          <Image
                            className="size-full absolute top-0 start-0 object-cover rounded-md"
                            width={80}
                            height={80}
                            src={article?.featuredImageUrl || ""}
                            alt="Blog Image"
                          />
                        </div>
                        <div className="grow">
                          <span className="text-md font-bold text-gray-800 group-hover:text-gray-600 group-focus:text-gray-400 dark:text-neutral-200 dark:group-hover:text-blue-500 dark:group-focus:text-blue-500 leading-tight">
                            {capitalizeSentences(article?.title.toLowerCase())}
                          </span>
                        </div>
                      </Link>
                    </div>
                  ))}
              </div>
            </div>
          </div>
          {/* End Sidebar */}
        </div>
      </div>
      {/* End Blog Article */}
    </main>
  );
};

export default ArticleContentPage;
