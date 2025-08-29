import React from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";

const AdminPageArticles = () => {
  return (
    <main>
      <div className="flex mb-4">
        <div>
          <Button className="mr-2 bg-[#ffffff] border-1 text-stone-600 cursor-pointer">
            <Link href="/admin">Back to Dasboard</Link>
          </Button>
        </div>
        <div className="ml-auto">
          <Button className="mr-2">
            <Link href="/admin/articles/new">New Article</Link>
          </Button>
        </div>
      </div>

      <h1 className="text-2xl mt-4">Articles List</h1>
    </main>
  );
};

export default AdminPageArticles;
