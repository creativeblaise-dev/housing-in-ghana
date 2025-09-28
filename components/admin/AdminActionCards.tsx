import React from "react";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardFooter,
  CardContent,
} from "../ui/card";
import Image from "next/image";
import { Button } from "../ui/button";
import Link from "next/link";

const AdminActionCards = () => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-4 mt-6">
      <Card className="bg-[#ffec80] ">
        <CardHeader>
          <CardTitle>
            <h1 className="block text-lg font-bold text-gray-800 sm:text-4xl lg:text-2xl lg:leading-tight dark:text-white">
              Manage clients
            </h1>
          </CardTitle>
          <CardContent className="px-0 py-2">
            <div className="shrink-0 relative rounded-lg overflow-hidden ">
              <Image
                width={500}
                height={300}
                className="size-full  top-0 start-0 object-cover rounded-lg"
                src="/images/editions-hig-magazine.png"
                alt="Blog Image"
              />
            </div>
          </CardContent>
        </CardHeader>
        <CardFooter>
          <Button className=" text-sm font-medium rounded-lg border border-transparent bg-stone-800 text-white hover:bg-blue-700 focus:outline-hidden focus:bg-blue-700 cursor-pointer">
            <span>Manage ads</span>
          </Button>
        </CardFooter>
      </Card>
      <Card className="bg-transparent py-2">
        <CardHeader className="px-2">
          <div className="shrink-0 relative rounded-lg overflow-hidden ">
            <Image
              width={500}
              height={300}
              className="size-full  top-0 start-0 object-cover rounded-lg"
              src="/images/modern-home.jpg"
              alt="Blog Image"
            />
          </div>
          <CardTitle>
            <h1 className="block text-lg font-bold text-gray-800 sm:text-4xl lg:text-2xl lg:leading-tight dark:text-white">
              Gallery Images
            </h1>
          </CardTitle>
          <CardDescription>
            <p className="mt-1 text-[16px] text-gray-800 dark:text-neutral-400">
              {" "}
              Quickly upload images to the gallery.{" "}
            </p>
          </CardDescription>
        </CardHeader>
        <CardFooter className="px-2">
          <Link href="/admin/mileage">
            <Button className=" text-sm font-medium rounded-lg border border-transparent bg-red-500 text-white hover:bg-blue-700 focus:outline-hidden focus:bg-blue-700 cursor-pointer">
              <span>Add photos</span>
            </Button>
          </Link>
        </CardFooter>
      </Card>
      <Card className="bg-[#ff2727] ">
        <CardHeader className="">
          <CardTitle>
            <h1 className="block text-lg font-bold text-white sm:text-4xl lg:text-2xl lg:leading-tight dark:text-white">
              Create a Brand Spotlight
            </h1>
          </CardTitle>
          <CardDescription>
            <p className="mt-1 text-[16px] text-gray-200 dark:text-neutral-400">
              Showcase brands and businesses to your audience.
            </p>
          </CardDescription>
        </CardHeader>
        <CardFooter>
          <Button className=" text-sm font-medium rounded-lg border border-transparent bg-stone-800 text-white hover:bg-blue-700 focus:outline-hidden focus:bg-blue-700 cursor-pointer">
            <span>Add spotlight</span>
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
};

export default AdminActionCards;
