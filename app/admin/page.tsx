import React from "react";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardFooter,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import AdminDashboardStats from "@/components/admin/AdminDashboardStats";
import AdminActionCards from "@/components/admin/AdminActionCards";
import QuickActions from "@/components/admin/QuickActions";

const page = () => {
  return (
    <main>
      <section className="mb-10">
        <div className="grid md:flex  gap-10">
          <div className="lg:flex-row lg:flex-2 ">
            <section className="relative isolate overflow-hidden rounded-xl mb-4  shadow-amber-200 shadow-sm">
              <Card className="bg-transparent border border-gray-300">
                <CardHeader>
                  <CardTitle>
                    <h1 className="block text-3xl font-bold text-gray-800 sm:text-4xl lg:text-4xl lg:leading-tight dark:text-white">
                      Housing <span className="text-red-600">In Ghana</span>{" "}
                      Admin, <br /> Content and Client management system.
                    </h1>
                  </CardTitle>
                  <CardDescription>
                    <p className="mt-3 text-[18px] text-gray-800 dark:text-neutral-400">
                      Start managing your content and clients with ease.
                    </p>
                  </CardDescription>
                </CardHeader>
              </Card>

              <div
                aria-hidden="true"
                className="absolute top-10 left-1/2 -z-10 -translate-x-1/2 blur-2xl xl:-top-50"
              >
                <div
                  style={{
                    clipPath:
                      "polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)",
                  }}
                  className="aspect-1155/678 w-288.75 bg-linear-to-tb from-[#f0fca9] to-[#ff0e0e] opacity-80 bg-[url(/images/editions-hig-magazine.png)]"
                />
              </div>
            </section>
            <div className="px-4 mb-4">
              <h2 className="text-lg font-bold">Dashboard Overview</h2>
              <p className="text-sm text-muted-foreground">
                Quick insights into your platform's performance.
              </p>
            </div>
            <AdminDashboardStats />
          </div>
          <div className="flex-row flex-1 ">
            <div className="px-4 mb-4">
              <h2 className="text-lg font-bold">Recent Activities</h2>
              <p className="text-sm text-muted-foreground">
                Stay updated with the latest actions on your platform.
              </p>
            </div>
            <div className="shadow-4xl p-4 flex flex-col bg-gray-100 rounded-lg dark:bg-neutral-700/30 mb-4">
              <Image
                className="rounded-lg"
                src="/images/IMG_3824.jpg"
                alt="Recent Activities Placeholder"
                width={400}
                height={200}
              />
              <p className="mt-3 text-sm text-gray-600 dark:text-neutral-400">
                Recent activities will be displayed here once you start managing
                your content and clients.
              </p>
            </div>
          </div>
        </div>
      </section>
      <section>
        <div className="grid md:flex gap-10">
          <div className="lg:flex-row lg:flex-2 mb-4">
            <div className="px-4 mb-4">
              <h2 className="text-lg font-bold">Quick Actions</h2>
              <p className="text-sm text-muted-foreground">
                Access frequently used features and tools.
              </p>
            </div>
            <QuickActions />
            <AdminActionCards />
          </div>
          <div className="flex-row flex-1 ">
            <div className="shadow-4xl mb-6 ">
              <Card className="bg-transparent ">
                <CardHeader>
                  <CardTitle>
                    <h1 className="block text-3xl font-bold text-gray-800 sm:text-4xl lg:text-3xl lg:leading-tight dark:text-white">
                      Start your journey with
                      <span className="text-red-600">Preline</span>
                    </h1>
                  </CardTitle>
                  <CardDescription>
                    <p className="mt-3 text-[20px] text-gray-800 dark:text-neutral-400">
                      Hand-picked professionals and expertly crafted components,
                      designed for any kind of entrepreneur.
                    </p>
                  </CardDescription>
                </CardHeader>
                <CardFooter>
                  <Button className="py-3 px-4 inline-flex justify-center items-center gap-x-2 text-sm font-medium rounded-lg border border-transparent bg-stone-800 text-white hover:bg-blue-700 focus:outline-hidden focus:bg-blue-700 cursor-pointer">
                    <span>Get Started</span>
                  </Button>
                </CardFooter>
              </Card>
            </div>
            {/* Card */}
            <div className="shadow-4xl p-4 flex flex-col bg-gray-100 rounded-lg dark:bg-neutral-700/30">
              <h3 className="font-semibold text-sm text-gray-800 dark:text-neutral-200">
                Connect to your mailboxes
              </h3>

              <div className="mt-3">
                <p className="text-sm text-gray-500 dark:text-neutral-500">
                  Connect to your favorite mailbox and recive updates to your
                  inbox.
                </p>
              </div>

              <div className="mt-3 flex flex-wrap justify-between items-center gap-2">
                <a
                  className="inline-flex items-center gap-x-0.5 text-[13px] text-indigo-700 underline underline-offset-2 hover:decoration-2 focus:outline-hidden focus:decoration-2 disabled:opacity-50 disabled:pointer-events-none dark:text-indigo-400"
                  href="#"
                >
                  Discover more
                </a>

                {/* Avatar Group */}
                <div className="flex gap-x-2">
                  <div className="size-7 flex justify-center items-center bg-white shadow-xs rounded-md dark:bg-neutral-900">
                    <svg
                      className="shrink-0 size-4"
                      width="32"
                      height="32"
                      viewBox="0 0 32 32"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M7.34318 0.00012207H24.6569C28.725 0.00012207 32 3.27516 32 7.34327V24.657C32 28.7251 28.725 32.0001 24.6569 32.0001H7.34318C3.27507 32.0001 2.52724e-05 28.7251 2.52724e-05 24.657V7.34327C2.52724e-05 3.27516 3.27507 0.00012207 7.34318 0.00012207Z"
                        fill="url(#paint0_linear_5465_1620)"
                      ></path>
                      <path
                        d="M7.01113 9.1001C6.84252 9.1001 6.68368 9.12919 6.53335 9.18899L9.54446 12.289L12.5889 15.4446L12.6445 15.5112L12.8222 15.689L13 15.8779L15.6111 18.5557C15.6546 18.5827 15.7806 18.6994 15.879 18.7486C16.0058 18.812 16.1432 18.8704 16.2849 18.8754C16.4377 18.8809 16.594 18.8371 16.7315 18.7702C16.8345 18.7201 16.8803 18.6483 17 18.5557L20.0222 15.4334L26.0222 9.25566C25.8332 9.15324 25.6239 9.1001 25.4 9.1001H7.01113ZM6.08891 9.47788C5.7678 9.78214 5.56668 10.2395 5.56668 10.7557V20.9334C5.56668 21.3513 5.7009 21.731 5.92224 22.0223L6.34446 21.6223L9.48891 18.5668L12.2778 15.8668L12.2222 15.8001L9.16668 12.6557L6.11113 9.5001L6.08891 9.47788ZM26.4222 9.57788L20.4 15.8001L20.3445 15.8557L23.2445 18.6668L26.3889 21.7223L26.5778 21.9001C26.7471 21.6285 26.8445 21.2938 26.8445 20.9334V10.7557C26.8445 10.2955 26.685 9.87817 26.4222 9.57788ZM12.6333 16.2334L9.85557 18.9334L6.70002 21.989L6.30002 22.3779C6.5109 22.5137 6.75088 22.6001 7.01113 22.6001H25.4C25.7129 22.6001 25.9967 22.4797 26.2334 22.289L26.0334 22.089L22.8778 19.0334L19.9778 16.2334L17.3667 18.9223C17.2254 19.016 17.1309 19.1199 16.9929 19.1837C16.7709 19.2864 16.5275 19.3733 16.2828 19.3696C16.0375 19.3658 15.797 19.2698 15.5768 19.1615C15.4663 19.1072 15.4074 19.0531 15.2778 18.9446L12.6333 16.2334Z"
                        fill="white"
                      ></path>
                      <defs>
                        <linearGradient
                          id="paint0_linear_5465_1620"
                          x1="16.2241"
                          y1="31.8717"
                          x2="16.2552"
                          y2="0.386437"
                          gradientUnits="userSpaceOnUse"
                        >
                          <stop stopColor="#70EFFF"></stop>
                          <stop offset="1" stopColor="#5770FF"></stop>
                        </linearGradient>
                      </defs>
                    </svg>
                  </div>
                  <div className="size-7 flex justify-center items-center bg-white shadow-xs rounded-md dark:bg-neutral-900">
                    <svg
                      className="shrink-0 size-4"
                      width="33"
                      height="32"
                      viewBox="0 0 33 32"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <g clipPath="url(#clip0_41)">
                        <path
                          d="M32.2566 16.36C32.2566 15.04 32.1567 14.08 31.9171 13.08H16.9166V19.02H25.7251C25.5454 20.5 24.5866 22.72 22.4494 24.22L22.4294 24.42L27.1633 28.1L27.4828 28.14C30.5189 25.34 32.2566 21.22 32.2566 16.36Z"
                          fill="#4285F4"
                        ></path>
                        <path
                          d="M16.9166 32C21.231 32 24.8463 30.58 27.5028 28.12L22.4694 24.2C21.1111 25.14 19.3135 25.8 16.9366 25.8C12.7021 25.8 9.12677 23 7.84844 19.16L7.66867 19.18L2.71513 23L2.65521 23.18C5.2718 28.4 10.6648 32 16.9166 32Z"
                          fill="#34A853"
                        ></path>
                        <path
                          d="M7.82845 19.16C7.48889 18.16 7.28915 17.1 7.28915 16C7.28915 14.9 7.48889 13.84 7.80848 12.84V12.62L2.81499 8.73999L2.6552 8.81999C1.55663 10.98 0.937439 13.42 0.937439 16C0.937439 18.58 1.55663 21.02 2.63522 23.18L7.82845 19.16Z"
                          fill="#FBBC05"
                        ></path>
                        <path
                          d="M16.9166 6.18C19.9127 6.18 21.9501 7.48 23.0886 8.56L27.6027 4.16C24.8263 1.58 21.231 0 16.9166 0C10.6648 0 5.27181 3.6 2.63525 8.82L7.80851 12.84C9.10681 8.98 12.6821 6.18 16.9166 6.18Z"
                          fill="#EB4335"
                        ></path>
                      </g>
                      <defs>
                        <clipPath id="clip0_41">
                          <rect
                            width="32"
                            height="32"
                            fill="white"
                            transform="translate(0.937439)"
                          ></rect>
                        </clipPath>
                      </defs>
                    </svg>
                  </div>
                  <div className="size-7 flex justify-center items-center bg-white shadow-xs rounded-md dark:bg-neutral-900">
                    <svg
                      className="shrink-0 size-4"
                      width="17"
                      height="16"
                      viewBox="0 0 17 16"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M0.04 8C0.04 3.5816 3.6208 0 8.04 0C12.4576 0 16.04 3.5816 16.04 8C16.04 12.4184 12.4576 16 8.04 16C3.6208 16 0.04 12.4184 0.04 8Z"
                        fill="#FC3F1D"
                      ></path>
                      <path
                        d="M9.064 4.5328H8.3248C6.9696 4.5328 6.2568 5.2192 6.2568 6.2312C6.2568 7.3752 6.7496 7.9112 7.7616 8.5984L8.5976 9.1616L6.1952 12.7512H4.4L6.556 9.54C5.316 8.6512 4.62 7.788 4.62 6.328C4.62 4.4976 5.896 3.248 8.316 3.248H10.7184V12.7424H9.064V4.5328Z"
                        fill="white"
                      ></path>
                    </svg>
                  </div>
                </div>
                {/* End Avatar Group */}
              </div>
            </div>
            {/* End Card */}
          </div>
        </div>
      </section>
    </main>
  );
};

export default page;
