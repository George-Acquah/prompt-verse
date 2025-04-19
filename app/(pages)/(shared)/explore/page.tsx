import Feed from "@/components/Feed";
import { IconArrowDown } from "@/components/ui/icons";
import { Suspense } from "react";
import Link from "next/link";
import { TrendingCategories } from "@/components/trendingCategories";

type Params = { searchParams: Promise<_ISearchQuery> };

const ExplorePage = async ({ searchParams }: Params) => {
  const searchParam = await searchParams;

  return (
    <main className="w-full">
      {/* Desktop Layout (lg screens and up) */}
      <div className="hidden lg:block">
        <div className="container px-6 max-w-7xl mx-auto">
          <div className="flex gap-12 items-start">
            {/* Left Column - Categories */}
            <div className="w-2/5 flex-shrink">
              <Suspense
                fallback={
                  <div className="h-64 bg-gray-200/50 dark:bg-gray-800/50 rounded-xl animate-pulse" />
                }
              >
                <TrendingCategories />
              </Suspense>
            </div>

            {/* Right Column - Content */}
            <div className="w-3/5">
              {/* Hero Section */}
              <section className="w-full">
                <h1 className="text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl">
                  Discover & Share
                  <span className="blue_gradient"> AI Prompts</span>
                </h1>
                <p className="max-w-xl text-center mt-4 text-lg text-gray-600 dark:text-gray-300">
                  Browse thousands of community-shared prompts that have helped
                  creators boost their productivity.
                </p>
              </section>
            </div>
          </div>

          {/* Feed Content */}
          <section className="w-full py-4">
            <Suspense fallback={<p>Loading prompts...</p>}>
              <Feed searchParam={searchParam} />
            </Suspense>
          </section>
        </div>
      </div>

      {/* Mobile Layout (below lg screens) */}
      <div className="lg:hidden">
        {/* Hero Section */}
        <section className="w-full py-8 md:py-12 px-6">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl">
              Discover & Share
              <span className="blue_gradient"> AI Prompts</span>
            </h1>
            <p className="max-w-2xl mx-auto mt-4 text-lg text-gray-600 dark:text-gray-300">
              Browse thousands of community-shared prompts that have helped
              creators boost their productivity.
            </p>
          </div>
        </section>

        {/* Feed Content */}
        <section className="w-full py-4 md:py-8 px-6">
          <div className="max-w-3xl mx-auto">
            <Suspense fallback={<p>Loading prompts...</p>}>
              <Feed searchParam={searchParam} />
            </Suspense>
          </div>
        </section>

        {/* Mobile Categories CTA */}
        <div className="sticky bottom-4 z-10 flex justify-center lg:hidden">
          <Link
            href="#explore-categories"
            className="flex items-center gap-2 px-6 py-3 bg-blue-600 text-white rounded-full shadow-lg hover:bg-blue-700 transition-colors"
          >
            Browse Categories
            <IconArrowDown className="h-4 w-4" />
          </Link>
        </div>

        {/* Mobile Categories Section */}
        <section
          id="explore-categories"
          className="w-full lg:hidden py-12 bg-gray-50/50 dark:bg-gray-900/30"
        >
          <div className="max-w-3xl mx-auto px-6">
            <Suspense
              fallback={
                <div className="h-64 bg-gray-200/50 dark:bg-gray-800/50 rounded-xl animate-pulse" />
              }
            >
              <TrendingCategories compact/>
            </Suspense>
          </div>
        </section>
      </div>
    </main>
  );
};

export default ExplorePage;
