"use client";

import React from "react";
import Link from "next/link";
import { ArticleType } from "@/types";
import Image from "next/image";
import { IconCircleCheckFilled, IconCircleXFilled } from "@tabler/icons-react";
import { capitalizeSentences } from "@/lib/utils";
import { useQuery } from "@tanstack/react-query";

const ArticlesList = () => {
  const {
    data: allArticles,
    isFetching,
    isError,
  } = useQuery({
    queryKey: ["articles"],
    queryFn: () => fetch("/api/articles").then((res) => res.json()),
    // Data is already available from server prefetch
  });

  if (isFetching) return <div>Loading...</div>;
  if (isError) return <div>Error loading posts</div>;

  return (
    <main>
      {/* Table Section */}
      <div className="max-w-[85rem] px-4 py-10 sm:px-6 lg:px-0 lg:py-6 mx-auto">
        {/* Card */}
        <div className="flex flex-col">
          <div className="overflow-y-auto [&::-webkit-scrollbar]:h-2 [&::-webkit-scrollbar-thumb]:rounded-full [&::-webkit-scrollbar-thumb]:bg-gray-300 dark:[&::-webkit-scrollbar-thumb]:bg-neutral-500">
            <div className="min-w-full inline-block align-middle">
              <div className="bg-white border border-gray-200 rounded-xl shadow-2xs overflow-hidden dark:bg-neutral-800 dark:border-neutral-700">
                {/* Header */}
                <div className="px-6 py-4 grid gap-3 md:flex md:justify-between md:items-center border-b border-gray-200 dark:border-neutral-700">
                  <div>
                    <h2 className="text-xl font-semibold text-gray-800 dark:text-neutral-200">
                      Articles
                    </h2>
                    <p className="text-sm text-gray-600 dark:text-neutral-400">
                      Add articles, edit and more.
                    </p>
                  </div>

                  <div>
                    <div className="inline-flex gap-x-2">
                      <a
                        className="py-2 px-3 inline-flex items-center gap-x-2 text-sm font-medium rounded-lg border border-gray-200 bg-white text-gray-800 shadow-2xs hover:bg-gray-50 disabled:opacity-50 disabled:pointer-events-none focus:outline-hidden focus:bg-gray-50 dark:bg-transparent dark:border-neutral-700 dark:text-neutral-300 dark:hover:bg-neutral-800 dark:focus:bg-neutral-800"
                        href="#"
                      >
                        View all
                      </a>

                      <Link
                        className="py-2 px-3 inline-flex items-center gap-x-2 text-sm font-medium rounded-lg border border-transparent bg-blue-600 text-white hover:bg-blue-700 focus:outline-hidden focus:bg-blue-700 disabled:opacity-50 disabled:pointer-events-none"
                        href="/admin/articles/new"
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
                          <path d="M5 12h14" />
                          <path d="M12 5v14" />
                        </svg>
                        Post Article
                      </Link>
                    </div>
                  </div>
                </div>
                {/* End Header */}

                {/* Table */}
                <table className="min-w-full divide-y divide-gray-200 dark:divide-neutral-700">
                  <thead className="bg-gray-50 dark:bg-neutral-800">
                    <tr>
                      <th scope="col" className="ps-6 py-3 text-start">
                        <label
                          htmlFor="hs-at-with-checkboxes-main"
                          className="flex"
                        >
                          <input
                            type="checkbox"
                            className="shrink-0 border-gray-300 rounded-sm text-blue-600 focus:ring-blue-500 checked:border-blue-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-neutral-800 dark:border-neutral-600 dark:checked:bg-blue-500 dark:checked:border-blue-500 dark:focus:ring-offset-gray-800"
                            id="hs-at-with-checkboxes-main"
                          />
                          <span className="sr-only">Checkbox</span>
                        </label>
                      </th>

                      <th
                        scope="col"
                        className="ps-6 lg:ps-3 xl:ps-0 pe-6 py-3 text-start"
                      >
                        <div className="flex items-center gap-x-2">
                          <span className="text-xs pl-10 font-semibold uppercase text-gray-800 dark:text-neutral-200">
                            Title
                          </span>
                        </div>
                      </th>

                      <th scope="col" className="px-6 py-3 text-start">
                        <div className="flex items-center gap-x-2">
                          <span className="text-xs font-semibold uppercase text-gray-800 dark:text-neutral-200">
                            Category
                          </span>
                        </div>
                      </th>

                      <th scope="col" className="px-6 py-3 text-start">
                        <div className="flex items-center gap-x-2">
                          <span className="text-xs font-semibold uppercase text-gray-800 dark:text-neutral-200">
                            Status
                          </span>
                        </div>
                      </th>

                      <th scope="col" className="px-6 py-3 text-start">
                        <div className="flex items-center gap-x-2">
                          <span className="text-xs font-semibold uppercase text-gray-800 dark:text-neutral-200">
                            Tags
                          </span>
                        </div>
                      </th>

                      <th scope="col" className="px-6 py-3 text-start">
                        <div className="flex items-center gap-x-2">
                          <span className="text-xs font-semibold uppercase text-gray-800 dark:text-neutral-200">
                            Created
                          </span>
                        </div>
                      </th>

                      <th scope="col" className="px-6 py-3 text-end"></th>
                    </tr>
                  </thead>

                  <tbody className="divide-y divide-gray-200 dark:divide-neutral-700">
                    {allArticles.map((article: ArticleType) => {
                      const publishedDate = new Date(article.createdAt);
                      return (
                        <tr key={article.slug}>
                          <td className="size-px whitespace-nowrap">
                            <div className="ps-6 py-3">
                              <label
                                htmlFor="hs-at-with-checkboxes-1"
                                className="flex"
                              >
                                <input
                                  type="checkbox"
                                  className="shrink-0 border-gray-300 rounded-sm text-blue-600 focus:ring-blue-500 checked:border-blue-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-neutral-800 dark:border-neutral-600 dark:checked:bg-blue-500 dark:checked:border-blue-500 dark:focus:ring-offset-gray-800"
                                  id="hs-at-with-checkboxes-1"
                                />
                                <span className="sr-only">Checkbox</span>
                              </label>
                            </div>
                          </td>
                          <td className="h-auto ">
                            <div className="ps-6 lg:ps-3 xl:ps-0 pe-6 py-3 w-100">
                              <div className="flex items-center gap-x-3 ">
                                <Link
                                  href={`/articles/${article.slug}`}
                                  className="flex items-center gap-4"
                                >
                                  <Image
                                    className="inline-block size-10 rounded-md"
                                    width={100}
                                    height={100}
                                    src={
                                      article.featuredImageUrl ||
                                      "/images/avatar.png"
                                    }
                                    alt="Avatar"
                                  />
                                  <div className="grow">
                                    <span className="block text-sm font-semibold text-gray-800 dark:text-neutral-200">
                                      {capitalizeSentences(
                                        article.title.toLowerCase()
                                      )}
                                    </span>
                                    {/* <span className="block text-sm text-gray-500 dark:text-neutral-500">
                                christina@site.com
                              </span> */}
                                  </div>
                                </Link>
                              </div>
                            </div>
                          </td>
                          <td className="size-px  whitespace-nowrap">
                            <div className="px-6 py-3">
                              <span className="block text-sm font-semibold text-gray-800 dark:text-neutral-200">
                                {article.category}
                              </span>
                              {/* <span className="block text-sm text-gray-500 dark:text-neutral-500">
                            Human resources
                          </span> */}
                            </div>
                          </td>
                          <td className="size-px whitespace-nowrap">
                            <div className="px-6 py-3">
                              <span
                                className={
                                  article.status === "published"
                                    ? "py-1 px-1.5 inline-flex items-center gap-x-1 text-xs font-medium bg-teal-100 text-teal-800 rounded-full dark:bg-teal-500/10 dark:text-teal-500"
                                    : "py-1 px-1.5 inline-flex items-center gap-x-1 text-xs font-medium bg-red-100 text-red-800 rounded-full dark:bg-red-500/10 dark:text-red-500"
                                }
                              >
                                {article.status === "published" ? (
                                  <IconCircleCheckFilled
                                    className="h-4 w-4"
                                    aria-hidden="true"
                                  />
                                ) : (
                                  <IconCircleXFilled
                                    className="h-4 w-4"
                                    aria-hidden="true"
                                  />
                                )}
                                <span>{article.status}</span>
                              </span>
                            </div>
                          </td>
                          <td className="size-px whitespace-nowrap">
                            <div className="px-6 py-3">
                              <div className="flex items-center gap-x-3">
                                <span className="text-sm text-gray-800 dark:text-neutral-500">
                                  {article.tags?.join(", ") || "no tags"}
                                </span>
                                {/* <div className="flex w-full h-1.5 bg-gray-200 rounded-full overflow-hidden dark:bg-neutral-700">
                              <div
                                className="flex flex-col justify-center overflow-hidden bg-gray-800 dark:bg-neutral-200"
                                role="progressbar"
                                style={{ width: "25%" }}
                                aria-valuenow={25}
                                aria-valuemin={0}
                                aria-valuemax={100}
                              ></div>
                            </div> */}
                              </div>
                            </div>
                          </td>
                          <td className="size-px whitespace-nowrap">
                            <div className="px-6 py-3">
                              <span className="text-sm text-gray-500 dark:text-neutral-500">
                                {publishedDate.toDateString()}
                              </span>
                            </div>
                          </td>
                          <td className="size-px whitespace-nowrap">
                            <div className="px-6 py-1.5">
                              <Link
                                className="inline-flex items-center gap-x-1 text-sm text-blue-600 decoration-2 hover:underline focus:outline-hidden focus:underline font-medium dark:text-blue-500"
                                href={`/admin/articles/edit/${article.slug}`}
                              >
                                Edit
                              </Link>
                            </div>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
                {/* End Table */}

                {/* Footer */}
                <div className="px-6 py-4 grid gap-3 md:flex md:justify-between md:items-center border-t border-gray-200 dark:border-neutral-700">
                  <div>
                    <p className="text-sm text-gray-600 dark:text-neutral-400">
                      <span className="font-semibold text-gray-800 dark:text-neutral-200">
                        {allArticles.length}
                      </span>{" "}
                      results
                    </p>
                  </div>

                  <div>
                    <div className="inline-flex gap-x-2">
                      <button
                        type="button"
                        className="py-1.5 px-2 inline-flex items-center gap-x-2 text-sm font-medium rounded-lg border border-gray-200 bg-white text-gray-800 shadow-2xs hover:bg-gray-50 disabled:opacity-50 disabled:pointer-events-none focus:outline-hidden focus:bg-gray-50 dark:bg-transparent dark:border-neutral-700 dark:text-neutral-300 dark:hover:bg-neutral-800 dark:focus:bg-neutral-800"
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
                        Prev
                      </button>

                      <button
                        type="button"
                        className="py-1.5 px-2 inline-flex items-center gap-x-2 text-sm font-medium rounded-lg border border-gray-200 bg-white text-gray-800 shadow-2xs hover:bg-gray-50 disabled:opacity-50 disabled:pointer-events-none focus:outline-hidden focus:bg-gray-50 dark:bg-transparent dark:border-neutral-700 dark:text-neutral-300 dark:hover:bg-neutral-800 dark:focus:bg-neutral-800"
                      >
                        Next
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
                          <path d="m9 18 6-6-6-6" />
                        </svg>
                      </button>
                    </div>
                  </div>
                </div>
                {/* End Footer */}
              </div>
            </div>
          </div>
        </div>
        {/* End Card */}
      </div>
      {/* End Table Section */}
    </main>
  );
};

export default ArticlesList;
