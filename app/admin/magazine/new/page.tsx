import React from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import ArticleForm from "@/components/admin/forms/ArticleForm";
import EditionForm from "@/components/admin/forms/EditionForm";

const page = () => {
  return (
    <main>
      <Button className="mr-2 bg-[#ffffff] border-1 text-stone-600 cursor-pointer mb-4">
        <Link href="/admin/magazine">Back to Magazine</Link>
      </Button>
      <h1>New Edition Form</h1>
      <div className="flex flex-col md:flex-row gap-4 mb-4">
        <div className="flex-2 bg-white p-4 shadow-md w-full md:w-2/3 rounded-lg">
          <p className="flex-1 text-sm mb-4">
            Fill out the form below to create a new edition. Ensure all fields
            are completed accurately.
          </p>
          <p className="flex-1 text-sm mb-4">
            After submission, you can view and manage your editions on the
            magazine editions page.
          </p>
          <EditionForm type="CREATE_EDITION" />
        </div>
        <div className="flex-1"></div>
      </div>
    </main>
  );
};

export default page;
