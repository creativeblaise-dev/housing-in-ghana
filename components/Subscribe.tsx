import { OptimizedImage } from "./OptimizedImage";

const Subscribe = () => {
  return (
    <div className="relative isolate overflow-hidden bg-red-700 py-12 sm:py-10 lg:py-10 lg:mt-10 lg:rounded-lg">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto grid max-w-2xl grid-cols-1 gap-x-8 gap-y-8 sm:gap-y-12 lg:max-w-none lg:grid-cols-2 lg:items-center">
          {/* Content Section */}
          <div className="max-w-xl lg:max-w-lg order-2 lg:order-1">
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-semibold tracking-tight text-white leading-tight">
              Stay Ahead in Ghana's Real Estate & Lifestyle Scene
            </h2>
            <p className="mt-3 sm:mt-4 text-sm sm:text-[16px] lg:text-[16px] text-gray-200 leading-relaxed">
              Subscribe to the Housing In Ghana Magazine newsletter and never
              miss a beat. Get the latest property listings, expert real estate
              tips, brand spotlights, and exclusive stories delivered straight
              to your inbox.
            </p>

            {/* Newsletter Form */}
            <div className="mt-6 sm:mt-8">
              <form className="flex flex-col sm:flex-row gap-3 sm:gap-4 max-w-md">
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
                  className="flex-1 min-w-0 rounded-md bg-white/95 px-3 py-2.5 sm:px-3.5 sm:py-2 text-sm sm:text-base text-gray-900 placeholder:text-gray-500 border border-white/20 focus:bg-white focus:border-transparent focus:outline-none focus:ring-2 focus:ring-white/50 transition-all duration-200"
                />
                <button
                  type="submit"
                  className="flex-shrink-0 rounded-md bg-stone-800 px-4 py-2.5 sm:px-3.5 sm:py-2 text-sm font-medium text-white shadow-lg hover:bg-stone-700 focus:outline-none focus:ring-2 focus:ring-white/50 focus:ring-offset-2 focus:ring-offset-red-700 transition-all duration-200 active:scale-95"
                >
                  Subscribe
                </button>
              </form>
            </div>
          </div>

          {/* Image Section */}
          <div className="relative order-1 lg:order-2 flex justify-center lg:justify-end">
            <div className="relative w-full max-w-sm sm:max-w-md lg:max-w-lg xl:max-w-xl">
              <OptimizedImage
                src="/images/editions-hig-magazine.png"
                width={600}
                height={600}
                alt="Housing In Ghana Magazine covers"
                className="w-full h-auto object-contain drop-shadow-2xl"
                priority
                sizes="(max-width: 640px) 320px, (max-width: 768px) 400px, (max-width: 1024px) 500px, 600px"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Background Decoration */}
      <div
        aria-hidden="true"
        className="absolute inset-0 -z-10 overflow-hidden"
      >
        <div
          className="absolute top-0 left-1/2 -translate-x-1/2 blur-3xl xl:-top-6 opacity-30"
          style={{
            clipPath:
              "polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)",
          }}
        >
          <div className="aspect-[1155/678] w-[72rem] bg-gradient-to-tr from-[#ff80b5] to-[#9089fc]" />
        </div>
      </div>
    </div>
  );
};

export default Subscribe;
