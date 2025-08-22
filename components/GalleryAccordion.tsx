import React from "react";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import GalleryGroupCarousel from "./GalleryGroupCarousel";

const GalleryAccordion = () => {
  return (
    <Accordion
      type="single"
      collapsible
      className="w-full"
      defaultValue="item-1"
    >
      <AccordionItem value="item-1">
        <AccordionTrigger>Ashanti Region</AccordionTrigger>
        <AccordionContent className="flex flex-col gap-4 text-balance">
          <GalleryGroupCarousel />
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  );
};

export default GalleryAccordion;
