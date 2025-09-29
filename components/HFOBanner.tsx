import Link from "next/link";
import React from "react";
import { OptimizedImage } from "./OptimizedImage";

const HFOBanner = () => {
  return (
    <section className="px-10 md:px-20 pb-10 md:py-10 ">
      <div className="flex justify-center">
        <Link
          href="https://housingfaironline.com/"
          target="_blank"
          rel="noopener noreferrer"
        >
          <OptimizedImage
            src="/images/housingfair-banner-scaled.webp"
            width={900}
            height={200}
            alt="advert banner"
            className="rounded-xl "
          />
        </Link>
      </div>
    </section>
  );
};

export default HFOBanner;
