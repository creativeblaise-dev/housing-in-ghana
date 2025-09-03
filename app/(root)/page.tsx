import IntroContent from "@/components/IntroContent";
import BlogPreview from "@/components/BlogPreview";
import WhyHIG from "@/components/WhyHIG";
import HFOBanner from "@/components/HFOBanner";
import SpotlightPreview from "@/components/SpotlightPreview";
import MileageCard from "@/components/MileageCard";
import MagazineCard from "@/components/MagazineCard";
import Spotlighter from "@/components/Spotlighter";
import Subscribe from "@/components/Subscribe";
import ArticlesVariantCards from "@/components/ArticlesVariantCards";
import { db } from "@/database/drizzle";
import { article } from "@/database/schema";
import { ArticleType } from "@/types";
import { eq, desc } from "drizzle-orm";

const Home = async () => {
  const allArticles = (await db
    .select()
    .from(article)
    .where(eq(article.status, "published"))
    .orderBy(desc(article.createdAt))) as ArticleType[];
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
      <ArticlesVariantCards
        header="Latest Articles"
        featureArticles={allArticles}
      />

      <section className="md:px-20 md:mb-20">
        <Subscribe />
      </section>
    </>
  );
};

export default Home;
