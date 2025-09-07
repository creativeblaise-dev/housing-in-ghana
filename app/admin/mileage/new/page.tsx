import React from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import MileageForm from "@/components/admin/forms/MileageForm";

const page = () => {
  return (
    <main>
      <Button className="mr-2 bg-[#ffffff] border-1 text-stone-600 cursor-pointer mb-4">
        <Link href="/admin/magazine">Back to Magazine</Link>
      </Button>
      <div className="flex flex-col md:flex-row gap-4 mb-4">
        <div className="flex-2 bg-white p-4 shadow-md w-full md:w-2/3 rounded-lg">
          <MileageForm type="CREATE_MILEAGE_POST" />
        </div>
        <div className="flex-1"></div>
      </div>
    </main>
  );
};

export default page;
