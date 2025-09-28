import React from "react";
import {
  QueryClient,
  HydrationBoundary,
  dehydrate,
} from "@tanstack/react-query";
import { UserType } from "@/types";
import UsersList from "@/components/admin/UserList";

const getUsers = async () => {
  const response = await fetch("/api/users");
  return response.json() as Promise<UserType[]>;
};

const page = async () => {
  const queryClient = new QueryClient();

  // Prefetch on server
  await queryClient.prefetchQuery({
    queryKey: ["admin-users"],
    queryFn: getUsers,
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <UsersList />
    </HydrationBoundary>
  );
};

export default page;
