import React from "react";
import ThreeDCard from "./ThreeDCard";
import AccordionCard from "./AccordionCard";

const Contribution = () => {
  return (
    <section className="flex md:gap-15 flex-col md:flex-row px-10 py-10 md:px-20 pb-10 md:py-15  bg-[#ffffff]">
      <div className=" md:flex-1">
        <div className="flex justify-center ">
          <ThreeDCard image="/images/mileage-preview/2N6A5467_2.jpg" />
        </div>
      </div>
      <div className=" md:flex-3 ">
        <h1 className="text-4xl font-bold text-[#141516] mb-4 pt-4 text-balance">
          Editorially, Housing <span className="text-[#FF202B]">In Ghana</span>{" "}
          magazine delivers in-depth industry analysis, expert insights, and
          market trends.
        </h1>
        <AccordionCard
          heading1="Our Contribution"
          heading2="Partnership"
          description1="Beyond business success, we are committed to giving back to the community. A portion of magazine revenue is dedicated to supporting liver and kidney patients."
          description2="By partnering with HOUSING IN GHANA, you gain access to a powerful platform that drives business growth, enhances brand reputation, and contributes to a worthy cause. Let’s build a stronger real estate industry together."
        />
      </div>
    </section>
  );
};

export default Contribution;
