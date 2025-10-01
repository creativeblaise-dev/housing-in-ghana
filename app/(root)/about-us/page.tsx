import React from "react";
import Mission from "@/components/Mission";
import Contribution from "@/components/Contribution";
import { getImageUrl } from "@/lib/image-utils";

const backgroundImageUrl = getImageUrl("/images/IMG_0602.jpg");

const About = () => {
  return (
    <main>
      <section
        style={{ backgroundImage: `url(${backgroundImageUrl})` }}
        className=" bg-[#131313] bg-cover bg-center bg-no-repeat min-h-screen -mt-24 pt-28 pb-12 relative"
      >
        {/* Full gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-br from-black/90 via-stone-900/80 to-black/70"></div>

        <div className="grid md:grid-cols-2 gap-4 px-10 md:px-20 relative z-10 mt-5 lg:mt-20">
          <div className=" pt-5 md:col-start-1 md:col-end-2 md:w-190  md:h-120  ">
            <h1 className=" mb-6 font-bold text-3xl lg:text-5xl lh-lg text-slate-100 ">
              About Housing
              <span className="text-[#FF202B]"> In Ghana</span>
            </h1>
            <p className="mb-6 text-zinc-200 text-md text-balance">
              We are dedicated to fostering Ghana's thriving real estate
              ecosystem. Our flagship product, Housing in Ghana magazine, is a
              bi-annual publication targeting key industry players: developers,
              suppliers, professionals, lifestyle brands, and hotels.
            </p>
            <p className="mb-6 text-zinc-200 text-md text-balance">
              The magazine offers a dual-pronged approach. Commercially, we
              provide a high-impact platform for businesses to showcase their
              brands to a targeted audience. Advertisers enjoy benefits such as
              enhanced brand visibility, lead generation, and increased
              clientele. We aim to drive revenue growth and expand market reach.
            </p>
          </div>
          <div className="md:col-start-3 "></div>
        </div>
      </section>
      <Mission />
      <Contribution />
    </main>
  );
};

export default About;
