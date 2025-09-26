import React from "react";
import ArticlesList from "@/components/ArticlesList";
import { ArticleType } from "@/types";
import {
  QueryClient,
  HydrationBoundary,
  dehydrate,
} from "@tanstack/react-query";

const getArticles = async () => {
  const response = await fetch("/api/articles");
  return response.json() as Promise<ArticleType[]>;
};

const AdminPageArticles = async () => {
  const queryClient = new QueryClient();

  // Prefetch on server
  await queryClient.prefetchQuery({
    queryKey: ["articles"],
    queryFn: getArticles,
  });
  return (
    <main>
      <HydrationBoundary state={dehydrate(queryClient)}>
        <ArticlesList />
      </HydrationBoundary>
    </main>
  );
};

export default AdminPageArticles;
