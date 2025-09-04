import React from "react";
// import Image from "next/image";
import { Image } from "@imagekit/next";

const WhyHIG = () => {
  return (
    <section className="flex gap-10 flex-col md:flex-row px-10 md:px-20 pb-10 md:py-20  bg-[#ffffff]">
      <div className=" md:flex-2 ">
        <h1 className="text-4xl font-bold text-[#141516] mb-4 pt-4">
          Delivering Value in Real Estate & Beyond
        </h1>
        <p className="text-md">
          Housing In Ghana specializes in nurturing Ghana’s evolving real estate
          ecosystem. We publish a bi‑annual magazine tailored to developers,
          agents, service providers, and lifestyle brands.
        </p>
      </div>
      <div className=" md:flex-3">
        <section className="flex flex-col lg:flex-row gap-4">
          <div className="justify-center ">
            <Image
              urlEndpoint="https://ik.imagekit.io/devBlaiseElolo"
              src="http://localhost:3000/images/IMG_0602.jpg"
              width={300}
              height={200}
              alt="two ladies reading the housing in ghana magazine"
              className="border rounded-lg shadow-md shadow-stone-300 rotate-4 "
              loading="lazy"
            />
          </div>
          <div className="justify-center ">
            <Image
              urlEndpoint="https://ik.imagekit.io/devBlaiseElolo"
              src="http://localhost:3000/images/IMG_5660.jpg"
              width={300}
              height={200}
              alt="hig"
              className="border rounded-lg shadow-md shadow-stone-300 rotate-4"
              loading="lazy"
            />
          </div>
        </section>
      </div>
    </section>
  );
};

export default WhyHIG;
