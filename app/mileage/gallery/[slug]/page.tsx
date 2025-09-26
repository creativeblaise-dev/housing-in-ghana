import React from "react";
import { MileagePost } from "@/types";
import {
  QueryClient,
  dehydrate,
  HydrationBoundary,
} from "@tanstack/react-query";

import SimpleCarousel from "@/components/SimpleCarousel";

const getMileagePosts = async () => {
  const response = await fetch("/api/mileage");
  return response.json() as Promise<MileagePost[]>;
};

export default async function Page({
  params,
}: {
  params: Promise<{ slug: MileagePost["id"] }>;
}) {
  const { slug } = await params;

  const queryClient = new QueryClient();

  // Prefetch on server
  await queryClient.prefetchQuery({
    queryKey: ["mileage"],
    queryFn: getMileagePosts,
  });

  return (
    <main>
      <HydrationBoundary state={dehydrate(queryClient)}>
        <SimpleCarousel slug={slug} />
      </HydrationBoundary>
    </main>
  );
}
