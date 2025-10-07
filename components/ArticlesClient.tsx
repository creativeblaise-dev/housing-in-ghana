"use client";

import { useQuery } from "@tanstack/react-query";
import BlogPreview from "@/components/BlogPreview";
import { ArticleType } from "@/types";
import Loader from "./Loader";

async function fetchArticles(): Promise<ArticleType[]> {
  const res = await fetch("/api/articles", { cache: "no-store" });
  if (!res.ok) throw new Error("Failed to fetch articles");
  return res.json();
}

export default function ArticlesClient({
  initialData,
}: {
  initialData: ArticleType[];
}) {
  const {
    data: articles,
    isError,
    isFetching,
  } = useQuery({
    queryKey: ["articles"],
    queryFn: fetchArticles,
    initialData, // comes from Drizzle server query
    staleTime: 60000, // consider fresh for 1 minute
    refetchOnWindowFocus: false,
  });

  return isFetching ? (
    <Loader />
  ) : (
    <BlogPreview
      header="Read our Latest Articles"
      initialData={articles ?? []}
    />
  );
}
