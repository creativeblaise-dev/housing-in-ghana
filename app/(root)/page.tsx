import IntroContent from "@/components/IntroContent";
import WhyHIG from "@/components/WhyHIG";
import HFOBanner from "@/components/HFOBanner";
import SpotlightPreview from "@/components/SpotlightPreview";
import MileageCard from "@/components/MileageCard";
import MagazineCard from "@/components/MagazineCard";
import Spotlighter from "@/components/Spotlighter";
import Subscribe from "@/components/Subscribe";
import ArticlesVariantCards from "@/components/ArticlesVariantCards";
import { HydrationBoundary } from "@tanstack/react-query";
import { QueryClient, dehydrate } from "@tanstack/react-query";
import { ArticleType } from "@/types";
import InfiniteCards from "@/components/InfiniteCards";
import ElevateBrand from "@/components/ElevateBrand";

const getArticles = async () => {
  const response = await fetch("/api/articles");
  return response.json() as Promise<ArticleType[]>;
};

const Home = async () => {
  const queryClient = new QueryClient();

  // Prefetch on server
  await queryClient.prefetchQuery({
    queryKey: ["articles"],
    queryFn: getArticles,
  });

  return (
    <>
      {/* coming soon */}
      <section className="bg-[url(/images/mileage-preview/IMG_5626.jpg)] bg-[#131313] bg-cover bg-center bg-no-repeat min-h-screen -mt-24 pt-28 pb-12 relative">
        <div className="absolute top-0 w-full h-full inset-0 bg-gradient-to-br from-black/80 via-stone-900/50 to-black/50"></div>
        <div className="grid md:grid-cols-2 gap-4 px-10 md:px-20 relative z-10 mt-10">
          <IntroContent />
        </div>
      </section>
      <WhyHIG />
      <MagazineCard />
      <Spotlighter />
      <SpotlightPreview />
      <section>
        <div className="sm:w-1/2 xl:w-2/3 mx-auto text-center pt-10">
          <h1 className="text-4xl font-bold text-[#141516] mb-4 pt-4">
            A Platform Companies Trust
          </h1>
          <p className="text-md">
            Recognized across the industry, Housing{" "}
            <span className="text-[#FF202B]"> In Ghana</span> is the trusted
            choice for companies seeking credibility, visibility, and meaningful
            engagement in Ghana’s housing and real estate space.
          </p>
        </div>
        <InfiniteCards />
      </section>
      <MileageCard />
      <HFOBanner />
      <HydrationBoundary state={dehydrate(queryClient)}>
        <ArticlesVariantCards header="Latest Articles" />
      </HydrationBoundary>
      <section className="md:px-20 md:mb-20">
        <Subscribe />
      </section>
      <ElevateBrand />
    </>
  );
};

export default Home;
