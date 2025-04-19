import { Suspense } from "react"
import dynamic from "next/dynamic";
import { Typography } from "./ui/typography";
import Loading from "./loading";
import { getTrendingTags } from "@/app/utils/action";

const Search = dynamic(() => import("@/components/search"), {
  loading: () => <Typography variant="span">Loading...</Typography>,
});

const PromptList = dynamic(() => import("@/components/promptList"), {
  loading: () => <Loading />,
});

const Feed = async ({ searchParam  }: { searchParam: _ISearchQuery }) => {
  const { size = 10, page = 1, query = '', tag, sort } = searchParam;
  const { data: tags } = await getTrendingTags(5);
  return (
    <section className="feed">
      <div className="flex justify-start items-center gap-3 w-full">
        <Search entityType="QUERY" tags={tags} />
      </div>
      <Suspense fallback={<Loading />}>
        <PromptList size={size} page={page} query={query} tag={tag} sort={ sort} />
      </Suspense>
    </section>
  );
};

export default Feed