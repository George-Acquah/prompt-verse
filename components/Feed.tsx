import { Suspense } from "react"
import dynamic from "next/dynamic";
import { getTrendingTags } from "@/app/utils/action";
import { PromptListSkeleton, SearchSkeleton } from "./skeletons/promptListSkeleton";

const FeedSearch = dynamic(() => import("@/components/promptClients").then(mod => mod.FeedSearch), {
  loading: () => <SearchSkeleton />,
});

const PromptList = dynamic(() => import("@/components/promptList"), {
  loading: () => <PromptListSkeleton />,
});

const Feed = async ({ searchParam  }: { searchParam: _ISearchQuery }) => {
  const { size = 10, page = 1, query = '', tag, sort } = searchParam;
  const { data: tags } = await getTrendingTags(5);
  return (
    <section className="feed">
      <div className="flex justify-start items-center gap-3 w-full">
        <FeedSearch tags={tags} />
      </div>
      <Suspense
        fallback={
          <PromptListSkeleton />
        }
      >
        <PromptList
          size={size}
          page={page}
          query={query}
          tag={tag}
          sort={sort}
        />
      </Suspense>
    </section>
  );
};

export default Feed