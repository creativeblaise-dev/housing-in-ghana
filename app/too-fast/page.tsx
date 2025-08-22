import { Button } from "@/components/ui/button";
import Link from "next/link";
import React from "react";

const page = () => {
  return (
    <>
      <div className="min-h-screen relative isolate overflow-hidden bg-[#313232] py-8 sm:py-24 px-10 lg:px-20 pb-10 lg:py-20 flex flex-col items-center justify-center">
        <div className="mx-auto max-w-7xl">
          <div className=" mx-auto grid justify-center items-center max-w-2xl  gap-x-8 gap-y-16 lg:max-w-none ">
            <div className="max-w-xl lg:max-w-lg text-center ">
              <h2 className="text-5xl font-semibold tracking-tight text-white ">
                Opps, Slow your roll!
              </h2>
              <p className="text-white text-lg text-balance py-4 text-center  tracking-tight">
                {" "}
                We have detected unusual activity from your IP address. <br />{" "}
                Please try again later or contact support if you believe this is
                an error.
              </p>
              <div className="flex justify-center gap-4">
                <Button className="mt-4 rounded-md  bg-red-500 px-4 py-2 text-sm font-semibold text-white shadow-sm hover:bg-stone-700 cursor-pointer">
                  Contact Support
                </Button>
                <Link href="/" passHref>
                  <Button className="mt-4 rounded-md bg-white px-4 py-2 text-sm font-semibold text-black shadow-sm hover:bg-amber-500 hover:text-white cursor-pointer">
                    Take me home
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </div>
        <div
          aria-hidden="true"
          className="absolute top-0 left-1/2 -z-10 -translate-x-1/2 blur-3xl xl:-top-6"
        >
          <div
            style={{
              clipPath:
                "polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)",
            }}
            className="aspect-1155/678 w-288.75 bg-linear-to-tr from-[#ffee59] to-[#ff5656] opacity-90 bg-[url(/images/mileage-preview/2N6A5473_2.jpg)]"
          />
        </div>
      </div>
    </>
  );
};

export default page;
