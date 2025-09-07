import Image from "next/image";
import React from "react";
import MileageCarousel from "./MileageCarousel";

const MileageCard = () => {
  return (
    <section className="grid grid-cols-1 px-10 md:px-20 pb-10 md:py-10 bg-[#ffffff]">
      <div className="md:w-200">
        <h1 className="text-4xl font-bold text-[#141516] mb-4 pt-4">
          Our Mileage - Where the Brand Travels
        </h1>
        <p>
          From bustling city centers to serene resort towns, Housing{" "}
          <span className="text-[#FF202B]"> In Ghana</span> travels far and
          wide. Our magazine and brand presence reach hotels, gas stations,
          bookshops, shopping malls, and real estate events across the country.
          Every edition extends our footprint—connecting readers, homeowners,
          and industry leaders where it matters most. With every mile, we build
          more than awareness—we build trust.
        </p>
      </div>
      <MileageCarousel />
    </section>
  );
};

export default MileageCard;
