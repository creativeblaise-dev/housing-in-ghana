import Link from "next/link";
import { Button } from "./ui/button";
import ThreeDCard from "./ThreeDCard";

const MagazineCard = () => {
  return (
    <section className="flex md:gap-15 flex-col md:flex-row px-10 md:px-20 pb-10 md:py-5  bg-[#ffffff]">
      <div className=" md:flex-1">
        <div className="flex justify-center ">
          <ThreeDCard image="/images/IMG_9719_2.jpg" />
        </div>
      </div>
      <div className=" md:flex-3 ">
        <h1 className="text-4xl font-bold text-[#141516] mb-4 pt-4">
          Housing <span className="text-[#FF202B]">In Ghana</span> Magazine -
          Real Estate Insights Delivered
        </h1>
        <p className="text-md">
          Stay informed with Housing In Ghana Magazine—your biannual guide to
          the people, projects, and policies shaping Ghana’s real estate scene.
          Each edition features expert opinions, success stories, investment
          tips, legal updates, and the latest in housing trends. Whether you're
          a first-time buyer, developer, or industry professional, there's
          something for you inside every page.
        </p>
        <div className="flex mt-4">
          <Link href="/">
            <Button className="bg-[#FF202B] text-white text-md  py-7 md:p-7 font uppercase w-auto cursor-pointer border-1 border-[#FF202B]">
              Magazine Editions
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default MagazineCard;
