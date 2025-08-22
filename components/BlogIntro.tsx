import Image from "next/image";

const BlogIntro = () => {
  return (
    <div className="relative isolate overflow-hidden bg-gray-900 py-8 sm:py-24 px-10 lg:px-20 pb-10 lg:py-20 ">
      <div className="mx-auto max-w-7xl">
        <div className=" mx-auto grid max-w-2xl grid-cols-1 gap-x-8 gap-y-16 lg:max-w-none lg:grid-cols-2">
          <div className="max-w-xl lg:max-w-lg">
            <h2 className="text-5xl font-semibold tracking-tight text-white">
              Blog — Insights, Trends & Inspiration for Ghana’s Housing Industry
            </h2>
            <p className="mt-6 text-md text-gray-300 text-balance mb-4">
              Stay ahead with expert opinions, market updates, and practical
              tips designed to guide you through Ghana’s dynamic real estate
              landscape.
            </p>
          </div>
          <div className="flex lg:top-10 lg:absolute lg:right-10 items-center">
            <Image
              src="/images/15555.jpg"
              width={600}
              height={600}
              alt="magazine covers"
              className="rounded-lg"
            />
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
          className="aspect-1155/678 w-288.75 bg-linear-to-tr from-[#ff80b5] to-[#9089fc] opacity-30"
        />
      </div>
    </div>
  );
};

export default BlogIntro;
