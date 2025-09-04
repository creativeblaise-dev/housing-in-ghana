import React from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import ArticlesList from "@/components/ArticlesList";

const AdminPageArticles = () => {
  return (
    <main>
      <h1 className="text-4xl font-bold">Manage Articles</h1>
      <ArticlesList />
    </main>
  );
};

export default AdminPageArticles;
