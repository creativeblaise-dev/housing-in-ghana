import Image from "next/image";

const Subscribe = () => {
  return (
    <div className="relative isolate overflow-hidden bg-red-700 py-8 sm:py-24 lg:py-10 lg:mt-10 lg:rounded-lg">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className=" mx-auto grid max-w-2xl grid-cols-1 gap-x-8 gap-y-16 lg:max-w-none lg:grid-cols-2">
          <div className="max-w-xl lg:max-w-lg">
            <h2 className="text-4xl font-semibold tracking-tight text-[#FFFFFF]">
              Stay Ahead in Ghana’s Real Estate & Lifestyle Scene
            </h2>
            <p className="mt-4 text-md text-gray-200">
              Subscribe to the Housing In Ghana Magazine newsletter and never
              miss a beat. Get the latest property listings, expert real estate
              tips, brand spotlights, and exclusive stories delivered straight
              to your inbox.
            </p>
            <div className="mt-6 flex max-w-md gap-x-4">
              <label htmlFor="email-address" className="sr-only">
                Email address
              </label>
              <input
                id="email-address"
                name="email"
                type="email"
                required
                placeholder="Enter your email"
                autoComplete="email"
                className="min-w-0 flex-auto rounded-md bg-white/90 px-3.5 py-2 text-base text-white outline-1 -outline-offset-1 outline-white/10 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-500 sm:text-sm/6"
              />
              <button
                type="submit"
                className="flex-none rounded-md bg-stone-800 px-3.5 py-2.5 text-sm font-medium text-white shadow-xs hover:bg-indigo-400 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500"
              >
                Subscribe
              </button>
            </div>
          </div>
          <div className="flex top-0 lg:absolute right-0 items-center">
            <Image
              src="/images/editions-hig-magazine.png"
              width={600}
              height={600}
              alt="magazine covers"
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

export default Subscribe;
