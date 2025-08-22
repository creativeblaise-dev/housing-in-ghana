import React from "react";
import Mission from "@/components/Mission";
import Contribution from "@/components/Contribution";
import Image from "next/image";

const About = () => {
  return (
    <main>
      <section className=" bg-[url(/images/IMG_0602.jpg)] bg-cover bg-no-repeat bg-center pb-0 pt-10 h-full">
        <div className="absolute top-15 w-full h-full py-80 md:pb-20 inset-0 bg-gradient-to-t from-[#111212c7] to-[#1a1b1bcb]  opacity-100 flex items-end justify-center "></div>
        <div className="grid md:grid-cols-2 gap-4 px-10 md:px-20 relative z-10 ">
          <div className=" pt-20 md:col-start-1 md:col-end-2 md:w-190  md:h-120  ">
            <h1 className=" mb-6 font-bold text-5xl lh-lg text-slate-100 ">
              About Housing
              <span className="text-[#FF202B]"> In Ghana</span>
            </h1>
            <p className="mb-6 text-slate-100 text-md text-balance">
              We are dedicated to fostering Ghana's thriving real estate
              ecosystem. Our flagship product, Housing in Ghana magazine, is a
              bi-annual publication targeting key industry players: developers,
              suppliers, professionals, lifestyle brands, and hotels.
            </p>
            <p className="mb-6 text-slate-100 text-md text-balance">
              The magazine offers a dual-pronged approach. Commercially, we
              provide a high-impact platform for businesses to showcase their
              brands to a targeted audience. Advertisers enjoy exclusive
              benefits such as complimentary trips to the most exciting sites in
              Ghana and beyond, radio jingles, discounted billboard rates, and
              increased clientele. We aim to drive revenue growth and expand
              market reach for our clients.
            </p>
          </div>
          <div className="md:col-start-3 ">
            <Image
              src="/images/mileage-preview/2N6A425_2.jpg"
              width={300}
              height={400}
              objectFit="cover"
              alt="housing in ghana magazine"
              className="border rounded-lg shadow-md  rotate-2 mt-10"
            />
          </div>
        </div>
      </section>
      <Mission />
      <Contribution />
    </main>
  );
};

export default About;
