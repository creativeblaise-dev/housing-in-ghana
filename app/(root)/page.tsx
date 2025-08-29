import IntroContent from "@/components/IntroContent";
import BlogPreview from "@/components/BlogPreview";
import WhyHIG from "@/components/WhyHIG";
import HFOBanner from "@/components/HFOBanner";
import SpotlightPreview from "@/components/SpotlightPreview";
import MileageCard from "@/components/MileageCard";
import MagazineCard from "@/components/MagazineCard";
import Spotlighter from "@/components/Spotlighter";
import Subscribe from "@/components/Subscribe";
import { authClient } from "@/lib/auth-client";

const Home = async () => {
  // const response = await fetch("http://localhost:3000/api/user");
  // const data = await response.json();
  // console.log("User data from /api/user:", data);

  return (
    <>
      {/* coming soon */}
      <section className="bg-[url(/images/mileage-preview/IMG_5626.jpg)] bg-[#131313] bg-cover bg-no-repeat bg-center mt-0 pb-12 pt-10">
        <div className="absolute top-15 w-full h-full inset-0 bg-gradient-to-b from-stone-900 opacity-100 flex items-end justify-center "></div>
        <div className="grid md:grid-cols-2 gap-4 px-10 md:px-20 relative z-10 ">
          <IntroContent />
        </div>
      </section>
      <WhyHIG />
      <MagazineCard />
      <Spotlighter />
      <SpotlightPreview />
      <MileageCard />
      <HFOBanner />
      <BlogPreview
        header="Learn the latest, from practical advice, legal updates, investment
          guides to design/interior features."
      />
      <section className="md:px-20 md:mb-20">
        <Subscribe />
      </section>
    </>
  );
};

export default Home;
