import React from "react";
import Image from "next/image";

const AdminLayout = async () => {
  return (
    <>
      {/* ========== HEADER ========== */}
      <header className="fixed top-0 inset-x-0 flex flex-wrap md:justify-start md:flex-nowrap z-48 lg:z-61 w-full bg-zinc-100 text-sm py-2.5">
        <nav className="px-4 sm:px-5.5 flex basis-full items-center w-full mx-auto">
          <div className="w-full flex items-center gap-x-1.5">
            <ul className="flex items-center gap-1.5">
              <li className="inline-flex items-center relative text-gray-200 pe-1.5 last:pe-0 last:after:hidden after:absolute after:top-1/2 after:end-0 after:inline-block after:w-px after:h-3.5 after:bg-gray-300 after:rounded-full after:-translate-y-1/2 after:rotate-12">
                <a
                  className="shrink-0 justify-center items-center  rounded-md text-xl inline-block font-semibold focus:outline-hidden focus:opacity-80"
                  href="@@href"
                  aria-label="Preline"
                >
                  <Image
                    src="/images/housing-in-ghana-logo.png"
                    alt="logo"
                    width={130}
                    height={40}
                  />
                </a>

                <div className="hidden sm:block ms-1"></div>

                {/* Sidebar Toggle */}
                <button
                  type="button"
                  className="p-1.5 size-7.5 inline-flex items-center gap-x-1 text-xs rounded-md border border-transparent text-gray-500 hover:text-gray-800 disabled:opacity-50 disabled:pointer-events-none focus:outline-hidden focus:text-gray-800"
                  aria-haspopup="dialog"
                  aria-expanded="false"
                  aria-controls="hs-pro-sidebar"
                  data-hs-overlay="#hs-pro-sidebar"
                >
                  <svg
                    className="shrink-0 size-3.5"
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <rect width="18" height="18" x="3" y="3" rx="2" />
                    <path d="M15 3v18" />
                    <path d="m10 15-3-3 3-3" />
                  </svg>
                  <span className="sr-only">Sidebar Toggle</span>
                </button>
                {/* End Sidebar Toggle */}
              </li>
            </ul>

            <ul className="flex flex-row items-center gap-x-3 ms-auto">
              <li className="hidden lg:inline-flex items-center gap-1.5 relative text-gray-500 pe-3 last:pe-0 last:after:hidden after:absolute after:top-1/2 after:end-0 after:inline-block after:w-px after:h-3.5 after:bg-gray-300 after:rounded-full after:-translate-y-1/2 after:rotate-12">
                <button
                  type="button"
                  className="flex items-center gap-x-1.5 py-2 px-2.5 font-medium text-xs bg-gray-200 text-black rounded-lg hover:bg-gray-300 focus:outline-hidden focus:bg-gray-300 disabled:opacity-50 disabled:pointer-events-none"
                >
                  <svg
                    className="shrink-0 size-4 text-indigo-700"
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    fill="currentColor"
                    viewBox="0 0 16 16"
                  >
                    <path d="M7.657 6.247c.11-.33.576-.33.686 0l.645 1.937a2.89 2.89 0 0 0 1.829 1.828l1.936.645c.33.11.33.576 0 .686l-1.937.645a2.89 2.89 0 0 0-1.828 1.829l-.645 1.936a.361.361 0 0 1-.686 0l-.645-1.937a2.89 2.89 0 0 0-1.828-1.828l-1.937-.645a.361.361 0 0 1 0-.686l1.937-.645a2.89 2.89 0 0 0 1.828-1.828zM3.794 1.148a.217.217 0 0 1 .412 0l.387 1.162c.173.518.579.924 1.097 1.097l1.162.387a.217.217 0 0 1 0 .412l-1.162.387A1.73 1.73 0 0 0 4.593 5.69l-.387 1.162a.217.217 0 0 1-.412 0L3.407 5.69A1.73 1.73 0 0 0 2.31 4.593l-1.162-.387a.217.217 0 0 1 0-.412l1.162-.387A1.73 1.73 0 0 0 3.407 2.31zM10.863.099a.145.145 0 0 1 .274 0l.258.774c.115.346.386.617.732.732l.774.258a.145.145 0 0 1 0 .274l-.774.258a1.16 1.16 0 0 0-.732.732l-.258.774a.145.145 0 0 1-.274 0l-.258-.774a1.16 1.16 0 0 0-.732-.732L9.1 2.137a.145.145 0 0 1 0-.274l.774-.258c.346-.115.617-.386.732-.732z" />
                  </svg>
                  Ask AI
                </button>

                <a
                  className="flex items-center gap-x-1.5 py-1.5 px-2 text-sm text-gray-800 rounded-lg hover:bg-gray-200 focus:outline-hidden focus:bg-gray-200"
                  href="#"
                >
                  Docs
                </a>

                <a
                  className="flex items-center gap-x-1.5 py-1.5 px-2 text-sm text-gray-800 rounded-lg hover:bg-gray-200 focus:outline-hidden focus:bg-gray-200"
                  href="#"
                >
                  API
                </a>
              </li>

              <li className="inline-flex items-center gap-1.5 relative text-gray-500 pe-3 last:pe-0 last:after:hidden after:absolute after:top-1/2 after:end-0 after:inline-block after:w-px after:h-3.5 after:bg-gray-300 after:rounded-full after:-translate-y-1/2 after:rotate-12">
                <button
                  type="button"
                  className="relative hidden lg:flex justify-center items-center gap-x-1.5 size-8 text-sm bg-gray-100 text-gray-500 rounded-full hover:bg-gray-200 hover:text-gray-800 focus:outline-hidden focus:bg-gray-200 focus:text-gray-800"
                >
                  <svg
                    className="shrink-0 size-4"
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M12 7v14" />
                    <path d="M3 18a1 1 0 0 1-1-1V4a1 1 0 0 1 1-1h5a4 4 0 0 1 4 4 4 4 0 0 1 4-4h5a1 1 0 0 1 1 1v13a1 1 0 0 1-1 1h-6a3 3 0 0 0-3 3 3 3 0 0 0-3-3z" />
                  </svg>
                  <span className="sr-only">Knowledge Base</span>
                </button>
                //profile goes here
              </li>
            </ul>
          </div>
        </nav>
      </header>
      {/* ========== END HEADER ========== */}

      {/* ========== MAIN SIDEBAR ========== */}
      {/* Sidebar */}
      <div
        id="hs-pro-sidebar"
        className="hs-overlay [--body-scroll:true] lg:[--overlay-backdrop:false] [--is-layout-affect:true] [--opened:lg] [--auto-close:lg]
hs-overlay-open:translate-x-0 lg:hs-overlay-layout-open:translate-x-0
-translate-x-full transition-all duration-300 transform
w-60
hidden
fixed inset-y-0 z-60 start-0
bg-zinc-100
lg:block lg:-translate-x-full lg:end-auto lg:bottom-0"
        role="dialog"
        tabIndex={-1}
        aria-label="Sidebar"
      >
        <div className="lg:pt-13 relative flex flex-col h-full max-h-full">
          {/* Body */}
          <nav className="p-3 size-full flex flex-col overflow-y-auto [&::-webkit-scrollbar]:w-2 [&::-webkit-scrollbar-thumb]:rounded-full [&::-webkit-scrollbar-track]:bg-gray-200 [&::-webkit-scrollbar-thumb]:bg-gray-300">
            <div className="lg:hidden mb-2 flex items-center justify-between">
              <button
                type="button"
                className="flex items-center gap-x-1.5 py-2 px-2.5 font-medium text-xs bg-black text-white rounded-lg focus:outline-hidden disabled:opacity-50 disabled:pointer-events-none"
              >
                <svg
                  className="shrink-0 size-4"
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  fill="currentColor"
                  viewBox="0 0 16 16"
                >
                  <path d="M7.657 6.247c.11-.33.576-.33.686 0l.645 1.937a2.89 2.89 0 0 0 1.829 1.828l1.936.645c.33.11.33.576 0 .686l-1.937.645a2.89 2.89 0 0 0-1.828 1.829l-.645 1.936a.361.361 0 0 1-.686 0l-.645-1.937a2.89 2.89 0 0 0-1.828-1.828l-1.937-.645a.361.361 0 0 1 0-.686l1.937-.645a2.89 2.89 0 0 0 1.828-1.828zM3.794 1.148a.217.217 0 0 1 .412 0l.387 1.162c.173.518.579.924 1.097 1.097l1.162.387a.217.217 0 0 1 0 .412l-1.162.387A1.73 1.73 0 0 0 4.593 5.69l-.387 1.162a.217.217 0 0 1-.412 0L3.407 5.69A1.73 1.73 0 0 0 2.31 4.593l-1.162-.387a.217.217 0 0 1 0-.412l1.162-.387A1.73 1.73 0 0 0 3.407 2.31zM10.863.099a.145.145 0 0 1 .274 0l.258.774c.115.346.386.617.732.732l.774.258a.145.145 0 0 1 0 .274l-.774.258a1.16 1.16 0 0 0-.732.732l-.258.774a.145.145 0 0 1-.274 0l-.258-.774a1.16 1.16 0 0 0-.732-.732L9.1 2.137a.145.145 0 0 1 0-.274l.774-.258c.346-.115.617-.386.732-.732z" />
                </svg>
                Ask AI
              </button>

              {/* Sidebar Toggle */}
              <button
                type="button"
                className="p-1.5 size-7.5 inline-flex items-center gap-x-1 text-xs rounded-md text-gray-500 disabled:opacity-50 disabled:pointer-events-none focus:outline-hidden"
                aria-haspopup="dialog"
                aria-expanded="false"
                aria-controls="hs-pro-sidebar"
                data-hs-overlay="#hs-pro-sidebar"
              >
                <svg
                  className="shrink-0 size-3.5"
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M18 6 6 18" />
                  <path d="m6 6 12 12" />
                </svg>
                <span className="sr-only">Sidebar Toggle</span>
              </button>
              {/* End Sidebar Toggle */}
            </div>

            <button
              type="button"
              className="p-1.5 ps-2.5 w-full inline-flex items-center gap-x-2 text-sm rounded-lg bg-white border border-gray-200 text-gray-600 shadow-xs hover:border-gray-300 focus:outline-hidden focus:border-gray-300 disabled:opacity-50 disabled:pointer-events-none"
              aria-haspopup="dialog"
              aria-expanded="false"
              aria-controls="hs-pro-cmsssm"
              data-hs-overlay="#hs-pro-cmsssm"
            >
              Search
              <span className="ms-auto flex items-center gap-x-1 py-px px-1.5 border border-gray-200 rounded-md">
                <svg
                  className="shrink-0 size-2.5"
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M15 6v12a3 3 0 1 0 3-3H6a3 3 0 1 0 3 3V6a3 3 0 1 0-3 3h12a3 3 0 1 0-3-3"></path>
                </svg>
                <span className="text-[11px] uppercase">k</span>
              </span>
            </button>

            <div className="pt-3 mt-3 flex flex-col border-t border-gray-200 first:border-t-0 first:pt-0 first:mt-0">
              <span className="block ps-2.5 mb-2 font-medium text-xs uppercase text-gray-500">
                Home
              </span>

              {/* List */}
              <ul className="flex flex-col gap-y-1">
                <li>
                  <a
                    className="w-full flex items-center gap-x-2 py-2 px-2.5 text-sm text-gray-800 rounded-lg hover:bg-gray-200 focus:outline-hidden focus:bg-gray-200 "
                    href="index.html"
                  >
                    Dashboard
                  </a>
                </li>
              </ul>
              {/* End List */}
            </div>

            <div className="pt-3 mt-3 flex flex-col border-t border-gray-200 first:border-t-0 first:pt-0 first:mt-0">
              <span className="block ps-2.5 mb-2 font-medium text-xs uppercase text-gray-500">
                Pages
              </span>

              {/* List */}
              <ul className="flex flex-col gap-y-1">
                <li>
                  <a
                    className="w-full flex items-center gap-x-2 py-2 px-2.5 text-sm text-gray-800 rounded-lg hover:bg-gray-200 focus:outline-hidden focus:bg-gray-200 "
                    href="posts.html"
                  >
                    Posts
                  </a>
                </li>
                <li>
                  <a
                    className="w-full flex items-center gap-x-2 py-2 px-2.5 text-sm text-gray-800 rounded-lg hover:bg-gray-200 focus:outline-hidden focus:bg-gray-200 "
                    href="members.html"
                  >
                    Members
                  </a>
                </li>
              </ul>
              {/* End List */}
            </div>

            <div className="pt-3 mt-3 flex flex-col border-t border-gray-200 first:border-t-0 first:pt-0 first:mt-0">
              <span className="block ps-2.5 mb-2 font-medium text-xs uppercase text-gray-500">
                Posts
              </span>

              {/* List */}
              <ul className="flex flex-col gap-y-1">
                <li>
                  <a
                    className="w-full flex items-center gap-x-2 py-2 px-2.5 text-sm text-gray-800 rounded-lg hover:bg-gray-200 focus:outline-hidden focus:bg-gray-200 "
                    href="create-post.html"
                  >
                    Create Post
                  </a>
                </li>
                <li>
                  <a
                    className="w-full flex items-center gap-x-2 py-2 px-2.5 text-sm text-gray-800 rounded-lg hover:bg-gray-200 focus:outline-hidden focus:bg-gray-200 "
                    href="draft.html"
                  >
                    Draft
                  </a>
                </li>
                <li>
                  <a
                    className="w-full flex items-center gap-x-2 py-2 px-2.5 text-sm text-gray-800 rounded-lg hover:bg-gray-200 focus:outline-hidden focus:bg-gray-200 "
                    href="published.html"
                  >
                    Published
                  </a>
                </li>
              </ul>
              {/* End List */}
            </div>

            <div className="pt-3 mt-3 lg:hidden flex flex-col border-t border-gray-200 first:border-t-0 first:pt-0 first:mt-0">
              <span className="block ps-2.5 mb-2 font-medium text-xs uppercase text-gray-500">
                Others
              </span>

              {/* List */}
              <ul className="flex flex-col gap-y-1">
                <li>
                  <a
                    className="w-full flex items-center gap-x-2 py-2 px-2.5 text-sm text-gray-800 rounded-lg hover:bg-gray-200 focus:outline-hidden focus:bg-gray-200"
                    href="#"
                  >
                    Docs
                  </a>
                </li>
                <li>
                  <a
                    className="w-full flex items-center gap-x-2 py-2 px-2.5 text-sm text-gray-800 rounded-lg hover:bg-gray-200 focus:outline-hidden focus:bg-gray-200"
                    href="#"
                  >
                    API
                  </a>
                </li>
              </ul>
              {/* End List */}
            </div>
          </nav>
          {/* End Body */}

          {/* Footer */}
          <footer className="mt-auto p-3 flex flex-col">
            {/* List */}
            <ul className="flex flex-col gap-y-1">
              <li>
                <a
                  className="w-full flex items-center gap-x-2 py-2 px-2.5 text-sm text-gray-800 rounded-lg hover:bg-gray-200 focus:outline-hidden focus:bg-gray-200"
                  href="#"
                >
                  <svg
                    className="shrink-0 size-4"
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M8.5 14.5A2.5 2.5 0 0 0 11 12c0-1.38-.5-2-1-3-1.072-2.143-.224-4.054 2-6 .5 2.5 2 4.9 4 6.5 2 1.6 3 3.5 3 5.5a7 7 0 1 1-14 0c0-1.153.433-2.294 1-3a2.5 2.5 0 0 0 2.5 2.5z" />
                  </svg>
                  What's new?
                </a>
              </li>
              <li>
                <a
                  className="w-full flex items-center gap-x-2 py-2 px-2.5 text-sm text-gray-800 rounded-lg hover:bg-gray-200 focus:outline-hidden focus:bg-gray-200"
                  href="#"
                >
                  <svg
                    className="shrink-0 size-4"
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M7.9 20A9 9 0 1 0 4 16.1L2 22Z" />
                  </svg>
                  Help & support
                </a>
              </li>
              <li className="lg:hidden">
                <a
                  className="w-full flex items-center gap-x-2 py-2 px-2.5 text-sm text-gray-800 rounded-lg hover:bg-gray-200 focus:outline-hidden focus:bg-gray-200"
                  href="#"
                >
                  <svg
                    className="shrink-0 size-4"
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M12 7v14" />
                    <path d="M3 18a1 1 0 0 1-1-1V4a1 1 0 0 1 1-1h5a4 4 0 0 1 4 4 4 4 0 0 1 4-4h5a1 1 0 0 1 1 1v13a1 1 0 0 1-1 1h-6a3 3 0 0 0-3 3 3 3 0 0 0-3-3z" />
                  </svg>
                  Knowledge Base
                </a>
              </li>
            </ul>
            {/* End List */}
          </footer>
          {/* End Footer */}
        </div>
      </div>
      {/* End Sidebar */}
      {/* ========== END MAIN SIDEBAR ========== */}

      {/* ========== MAIN CONTENT ========== */}
      <main className="lg:hs-overlay-layout-open:ps-60 bg-gray-100 transition-all duration-300 lg:fixed lg:inset-0 pt-16 px-3 pb-3">
        <div className="h-[calc(100dvh-62px)] lg:h-full overflow-hidden flex flex-col bg-white border border-gray-200 shadow-xs rounded-lg">
          {/* Body */}
          <div className="flex-1 flex flex-col overflow-y-auto [&::-webkit-scrollbar]:w-0">
            <div className="flex-1 flex flex-col lg:flex-row">
              <div className="flex-1 min-w-0 flex flex-col border-e border-gray-200"></div>
              {/* End Col */}

              {/* <div className="shrink-0">
                <div className="lg:w-80"></div>
              </div> */}
              {/* End Col */}
            </div>
          </div>
          {/* End Body */}
        </div>
      </main>
      {/* ========== END MAIN CONTENT ========== */}
    </>
  );
};

export default AdminLayout;
