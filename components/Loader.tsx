import React from "react";

const Loader = () => {
  return (
    <main className="flex justify-center items-center w-full h-screen py-10">
      <div
        className=" animate-spin inline-block size-8 border-3 border-current border-t-transparent text-red-600 rounded-full"
        role="status"
        aria-label="loading"
      >
        <span className="sr-only">Loading...</span>
      </div>
    </main>
  );
};

export default Loader;
