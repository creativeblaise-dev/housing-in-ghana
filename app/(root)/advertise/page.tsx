import React from "react";
import Link from "next/link";
import ThreeDCard from "@/components/ThreeDCard";
import { Button } from "@/components/ui/button";
import { getImageUrl } from "@/lib/image-utils";

const backgroundImageUrl = getImageUrl("/images/IMG_0880.jpg");

const Advertise = () => {
  const benefits = [
    {
      title: "Targeted Audience",
      description:
        "Reach key industry players including developers, suppliers, and professionals",
      icon: "🎯",
    },
    {
      title: "Brand Visibility",
      description:
        "Enhanced exposure through print, digital, and social media channels",
      icon: "👁️",
    },
    {
      title: "Lead Generation",
      description:
        "Connect with potential clients and expand your customer base",
      icon: "📈",
    },
    {
      title: "Industry Authority",
      description:
        "Position your brand as a trusted leader in Ghana's real estate market",
      icon: "🏆",
    },
  ];

  return (
    <main>
      {/* Hero Section */}
      <section
        style={{ backgroundImage: `url(${backgroundImageUrl})` }}
        className=" bg-cover bg-center bg-no-repeat min-h-screen -mt-24 pt-28 pb-12 relative"
      >
        {/* Full gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-br from-black/85 via-stone-900/70 to-black/60"></div>

        <div className="grid md:grid-cols-2 gap-8 px-10 md:px-20 relative z-10 mt-20">
          <div className="pt-5 md:col-start-1 md:col-end-2">
            <h1 className=" mb-6 font-bold text-5xl lh-lg text-zinc-100 ">
              Advertise With Housing
              <span className="text-[#FF202B]"> In Ghana</span>
            </h1>
            <p className="mb-3 text-zinc-200 text-md text-balance leading-normal">
              Partner with Ghana's premier real estate magazine to showcase your
              brand to industry leaders, developers, and decision-makers.
              Maximize your reach and drive business growth with our targeted
              advertising solutions.
            </p>
            <p className="mb-3 text-zinc-200 text-md text-wrap leading-normal">
              Whether you're looking to launch a new product, promote a service,
              or build brand awareness, we have the expertise and audience to
              help you succeed.
            </p>
          </div>

          {/* Stats Section */}
          <div className="md:col-start-2 flex items-center justify-center">
            <div className="grid grid-cols-2 gap-6 text-center">
              <div className="bg-white/80 backdrop-blur-sm rounded-lg p-6">
                <div className="text-3xl font-bold text-[#FF202B] mb-2">
                  10K+
                </div>
                <div className="text-slate-900 text-sm">Monthly Readers</div>
              </div>
              <div className="bg-white/80 backdrop-blur-sm rounded-lg p-6">
                <div className="text-3xl font-bold text-[#FF202B] mb-2">
                  200+
                </div>
                <div className="text-slate-900 text-sm">Industry Partners</div>
              </div>
              <div className="bg-white/80 backdrop-blur-sm rounded-lg p-6">
                <div className="text-3xl font-bold text-[#FF202B] mb-2">
                  100%
                </div>
                <div className="text-slate-900 text-sm">
                  Client Satisfaction
                </div>
              </div>
              <div className="bg-white/80 backdrop-blur-sm rounded-lg p-6">
                <div className="text-3xl font-bold text-[#FF202B] mb-2">3x</div>
                <div className="text-slate-900 text-sm">Annual Issues</div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section className="flex md:gap-15 flex-col md:flex-row px-10 md:px-20 pb-10 md:py-10  bg-[#ffffff]">
        <div className=" md:flex-1">
          <div className="flex justify-center ">
            <ThreeDCard image="/images/IMG_4297_2.jpg" />
          </div>
        </div>
        <div className=" md:flex-3 ">
          <h1 className="text-4xl font-bold text-[#141516] mb-4 pt-8">
            Why Advertise With Us?
          </h1>
          <p className="text-md mb-4">
            Build brand awareness, generate leads, and connect with Ghana's
            thriving real estate community through targeted advertising in
            Housing In Ghana magazine.
          </p>
          <p className="text-md">
            Our multi-channel approach ensures your message reaches the right
            audience, driving measurable results and business growth. Join
            brands that are shaping the future of real estate in Ghana.
          </p>
          <div className="flex mt-6">
            {/* Pop up  */}
            <Link href="/contact-us">
              <Button className="bg-[#343434] rounded-full text-white text-md  hover:text-white hover:bg-[#FF202B] py-5 md:p-5 font  w-auto cursor-pointer border-b-2  border-[#FF202B]">
                Get Started
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Why Advertise Section */}
      {/* <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-10 md:px-20">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-[#141516] mb-4">
              Why Choose Housing In Ghana?
            </h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Join the leading brands that trust us to elevate their presence in
              Ghana's dynamic real estate market. Here's why advertising with us
              delivers results.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {benefits.map((benefit, index) => (
              <div key={index} className="text-center group">
                <div className="text-6xl mb-4 group-hover:scale-110 transition-transform duration-200">
                  {benefit.icon}
                </div>
                <h3 className="text-xl font-semibold text-[#141516] mb-3">
                  {benefit.title}
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  {benefit.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section> */}

      {/* Packages Section */}
      {/* <section id="packages" className="py-20 bg-white">
        <PricingCards />
      </section> */}

      {/* CTA Section */}
    </main>
  );
};

export default Advertise;
