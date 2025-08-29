import React from "react";
import {
  IconArrowForward,
  IconBook,
  IconCopyPlusFilled,
} from "@tabler/icons-react";
import Link from "next/link";

type QuickActionsProps = {
  route?: string;
  title?: string;
  description?: string;
  icon?: React.ReactNode;
};

const actionCardList: QuickActionsProps[] = [
  {
    route: "#",
    title: "Add a New Article",
    description:
      "Create and publish articles to engage your audience and share valuable insights.",
    icon: (
      <IconCopyPlusFilled className="shrink-0 size-8 text-yellow-200 mt-0.5 me-6 dark:text-neutral-200" />
    ),
  },
  {
    route: "#",
    title: "Add Magazine Edition",
    description:
      "Create and publish articles to engage your audience and share valuable insights.",
    icon: (
      <IconBook className="shrink-0 size-8 text-yellow-200 mt-0.5 me-6 dark:text-neutral-200" />
    ),
  },
];

const QuickActions = () => {
  return (
    <div className="max-w-[85rem] py-0 sm:px-6 lg:px-0  lg:py-0 ">
      <div className="grid sm:grid-cols-2 lg:grid-cols-2 items-center gap-6">
        {actionCardList.map((action, index) => (
          <Link
            className="group flex gap-y-6 size-full bg-[#252524] hover:bg-stone-700 focus:outline-hidden focus:bg-gray-100 rounded-lg p-5 dark:hover:bg-neutral-800 dark:focus:bg-neutral-800"
            href={action.route || "#"}
          >
            {action.icon}

            <div>
              <div>
                <h3 className="block font-bold text-gray-100 dark:text-white">
                  {action.title}
                </h3>
                <p className="text-gray-300 dark:text-neutral-400">
                  {action.description}
                </p>
              </div>

              <p className="mt-3 inline-flex items-center gap-x-1 text-sm font-semibold text-gray-300 dark:text-neutral-200">
                <IconArrowForward className="shrink-0 size-8 text-slate-300 mt-0.5 me-6 dark:text-neutral-200" />
              </p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default QuickActions;
