import SignOutButton from "@/components/SignOutButton";
import { auth } from "@/auth";

const ContributorProfilePage = async () => {
  const session = await auth(); // Replace with actual session fetching logic
  return (
    <main className="p-10 lg:px-60 lg:py-10 bg-gray-100">
      <div className="flex items-center gap-x-3">
        <div className="shrink-0">
          <img
            className="shrink-0 size-16 rounded-full"
            src="/images/girl.png"
            alt="Avatar"
          />
        </div>

        <div className="grow">
          <h1 className="text-lg font-medium text-gray-800 dark:text-neutral-200">
            {session?.user?.name || "User"}
          </h1>
          <p className="text-sm text-gray-600 dark:text-neutral-400">
            Content Contributor
          </p>
        </div>
      </div>
      <div className="mt-8">
        <p className="text-sm text-gray-600 dark:text-neutral-400">
          I am a seasoned graphic designer with over 14 years of experience in
          creating visually appealing and user-centric designs. My expertise
          spans across UI design, design systems, and custom illustrations,
          helping clients bring their digital visions to life.
        </p>

        <p className="mt-3 text-sm text-gray-600 dark:text-neutral-400">
          Currently, I work remotely for Notion, where I design template UIs,
          convert them into HTML and CSS, and provide comprehensive support to
          our users. I am passionate about crafting elegant and functional
          designs that enhance user experiences.
        </p>

        <ul className="mt-5 flex flex-col gap-y-3">
          <li className="flex items-center gap-x-2.5">
            <svg
              className="shrink-0 size-3.5 text-gray-800 dark:text-neutral-200"
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
              <rect width="20" height="16" x="2" y="4" rx="2" />
              <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
            </svg>
            <a
              className="text-[13px] text-gray-500 underline hover:text-gray-800 hover:decoration-2 focus:outline-hidden focus:decoration-2 dark:text-neutral-500 dark:hover:text-neutral-400"
              href="#"
            >
              {session?.user?.email || "User"}
            </a>
          </li>
        </ul>

        <SignOutButton />
      </div>
    </main>
  );
};

export default ContributorProfilePage;
