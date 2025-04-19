import Feed from "@/components/Feed";
import { Suspense } from "react";

type Params = { searchParams: Promise<_ISearchQuery> };

const ExplorePage = async ({ searchParams }: Params) => {
  const searchParam = await searchParams;
  return (
    <section className="w-full flex-center  flex-col">
      <h1 className="head_text text-center">
        Explore & Share
        <br className="md:hidden" />
        <span className="orange_gradient text-center md:text-end">
          {" "}
          AI-Powered Prompts
        </span>
      </h1>
      <p className="desc text-center">
        PromptVerse is an expansive universe of AI-crafted prompts that propel
        creators on thrilling journeys of artistic expression and storytelling
        👌✨.
      </p>
      {/* feed */}
      <Suspense fallback={<p>loading feeds...</p>}>
        <Feed searchParam={searchParam} />
      </Suspense>
    </section>
  );
};

export default ExplorePage;
