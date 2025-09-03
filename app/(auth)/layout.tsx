import React, { ReactNode } from "react";
import Image from "next/image";
import Link from "next/link";

const layout = async ({ children }: { children: ReactNode }) => {
  return (
    <>
      <main className="relative flex flex-col text-light-100 sm:flex-row">
        <section className="sticky h-40 w-full sm:top-0 sm:h-screen sm:flex-1">
          <Image
            src="/images/MG_4818-scaled.jpg"
            width={1000}
            height={1000}
            alt="auth image"
            className="size-full object-cover"
          />
        </section>
        <section className="relative bg-[#f1f1f1] my-auto flex h-full min-h-screen flex-1 items-center bg-cover bg-top  px-5 py-10">
          <div className="mx-auto flex max-w-xl flex-col gap-6 rounded-lg ">
            <div className=" mx-auto flex max-w-xl flex-col gap-6 rounded-lg p-5">
              <Link href="/" className="flex items-center gap-2">
                <Image
                  src="/images/housing-in-ghana-logo.png"
                  width={150}
                  height={100}
                  alt="logo"
                />
              </Link>
            </div>

            <div>{children}</div>
          </div>
        </section>
      </main>
    </>
  );
};

export default layout;
