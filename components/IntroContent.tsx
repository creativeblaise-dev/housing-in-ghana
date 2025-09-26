import React from "react";
import { Button } from "./ui/button";
const IntroContent = () => {
  return (
    <>
      <div className=" pt-20 md:col-start-1 md:col-end-3 md:w-130 h-100 ">
        <h1 className=" mb-6 font-bold text-5xl lh-lg text-slate-100">
          Discover the ultimate guide to real estate <br />
          <span className="text-[#FF202B]"> in Ghana</span>
        </h1>
        <p className="mb-6 text-slate-100 text-md">
          Explore current trends, trusted listings, and industry insights for
          buyers, renters, investors—nationwide.
        </p>
        <div className="flex gap-3 ">
          <Button className="bg-[#FF202B] border-b-4 border-[#232525] rounded-full text-white text-md  py-7 md:p-7 font uppercase w-auto cursor-pointer">
            Get The Lastest Edition
          </Button>
          {/* <Button className="bg-[#222020] text-white text-md py-7 md:p-7  hover:text-white uppercase cursor-pointer border-1 border-[#F6BB2A]">
            Explore Our Platform
          </Button> */}
        </div>
      </div>
      <div className="px-4 md:col-start-3"></div>
    </>
  );
};

export default IntroContent;
