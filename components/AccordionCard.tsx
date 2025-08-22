import React from "react";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

type AccordionContent = {
  heading1: string;
  heading2: string;
  description1: string;
  description2: string;
};

const AccordianCard = ({
  heading1,
  heading2,
  description1,
  description2,
}: AccordionContent) => {
  return (
    <Accordion
      type="single"
      collapsible
      className="w-full"
      defaultValue="item-1"
    >
      <AccordionItem value="item-1">
        <AccordionTrigger>{heading1}</AccordionTrigger>
        <AccordionContent className="flex flex-col gap-4 text-balance">
          <p>{description1}</p>
        </AccordionContent>
      </AccordionItem>
      <AccordionItem value="item-2">
        <AccordionTrigger>{heading2}</AccordionTrigger>
        <AccordionContent className="flex flex-col gap-4 text-balance">
          <p>{description2}</p>
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  );
};

export default AccordianCard;
