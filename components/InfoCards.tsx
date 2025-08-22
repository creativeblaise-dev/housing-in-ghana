import { HoverEffect } from "./ui/card-hover-effect";

const InfoCards = () => {
  return (
    <div className="max-w-5xl mx-auto px-8">
      <HoverEffect items={projects} />
    </div>
  );
};

export const projects = [
  {
    title: "Targeted Exposure",
    description:
      " Connect directly with a focused audience of homebuyers, investors, developers, and real estate professionals.",
    link: "",
  },
  {
    title: "Enhanced Brand Credibility",
    description:
      " Position your brand alongside trusted industry content and expert insights.",
    link: "",
  },
  {
    title: "Multi-Channel Impact",
    description:
      "Gain visibility through print, digital, and social media platforms for maximum reach",
    link: "",
  },
  {
    title: "Proven Industry Impact",
    description:
      "Leverage a platform that has influenced decisions, fostered partnerships, and shaped conversations within Ghana’s housing and real estate sector.",
    link: "",
  },
  {
    title: "Brand Storytelling",
    description:
      "Go beyond traditional advertising with compelling narratives, stunning visuals, and expert editorial placement.",
    link: "",
  },
  {
    title: "Extended Shelf Life",
    description:
      "Your presence in Housing In Ghana magazine continues to generate awareness long after each issue is published.",
    link: "",
  },
];

export default InfoCards;
