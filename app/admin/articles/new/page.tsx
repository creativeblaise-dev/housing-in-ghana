import React from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import ArticleForm from "@/components/admin/forms/ArticleForm";
import Editor from "@/components/Editor";
const page = () => {
  return (
    <main>
      <Button className="mr-2 bg-[#ffffff] border-1 text-stone-600 cursor-pointer mb-4">
        <Link href="/admin/articles">Back to Articles</Link>
      </Button>
      <h1>New Article Form</h1>
      <div className="flex flex-col md:flex-row gap-4 mb-4">
        <div className="flex-2 bg-white p-4 shadow-md w-full md:w-2/3 rounded-lg">
          <p className="flex-1 text-sm mb-4">
            Fill out the form below to create a new article. Ensure all fields
            are completed accurately.
          </p>
          <p className="flex-1 text-sm mb-4">
            After submission, you can view and manage your articles in the
            articles list.
          </p>
          <ArticleForm type="CREATE_ARTICLE" />
        </div>
        <div className="flex-1"></div>
      </div>
    </main>
  );
};

export default page;
