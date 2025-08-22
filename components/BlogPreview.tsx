import React from "react";
import { Card, CardHeader, CardTitle } from "@/components/ui/card";
import Image from "next/image";
import { blogContent } from "@/data";
import Link from "next/link";

type BlogHeader = {
  header: string;
};

type Blog = {
  id: number;
  title: string;
  description: string;
  date: Date;
  image: string;
};

const BlogPreview = ({ header }: BlogHeader) => {
  return (
    <section className="px-10 lg:px-20 pb-10 lg:py-10 bg-[#fefee2]">
      <div className="flex flex-row  md:w-2/3 ">
        <h1 className="text-4xl font-bold text-[#141516] mb-4 pt-0">
          {header}
        </h1>
      </div>
      <div className="grid lg:grid-cols-4 grid-cols-1 lg:grid-row gap-4 py-4">
        {blogContent.map(({ title, description, date, image, id }: Blog) => {
          return (
            <Card className=" w-full max-w-sm p-3 pb-6 " key={id}>
              <Link href="/">
                <figure className=" pb-0 relative h-60 lg:h-40 ">
                  <Image
                    src={image}
                    alt={title}
                    layout="fill"
                    objectFit="cover"
                    className="rounded-lg"
                  />
                </figure>
                <CardHeader className="p-2">
                  <small className=" text-stone-600">
                    {date.toDateString()}
                  </small>
                  <CardTitle className="text-lg font-bold text-[#141516] text-balance">
                    {title}
                  </CardTitle>
                </CardHeader>
              </Link>
            </Card>
          );
        })}
      </div>
    </section>
  );
};

export default BlogPreview;
