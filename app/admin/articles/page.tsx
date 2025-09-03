import React from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import ArticlesList from "@/components/ArticlesList";

const AdminPageArticles = () => {
  return (
    <main>
      <ArticlesList />
    </main>
  );
};

export default AdminPageArticles;
