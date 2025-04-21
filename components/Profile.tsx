import React, { Suspense } from "react";
import PromptCard from "./PromptCard";
import { getPromptsByCreator } from "@/app/utils/action";
import { Typography } from "./ui/typography";
import dynamic from "next/dynamic";
import EmptyState from "./Empty";

interface ProfileProps {
  searchParam: _ISearchQuery;
  id: string;
}
const Search = dynamic(() => import("@/components/search"), {
  loading: () => <Typography variant="span">Loading...</Typography>,
});

const Profile = async ({ id, searchParam }: ProfileProps) => {
  const { size = 10, page = 1, query = "", tag } = searchParam;
  const { data: prompts } = await getPromptsByCreator(
    id,
    query,
    tag,
    size,
    page
  );

  return (
    <div className="">
      <Suspense>
        <Search entityType="QUERY" />
      </Suspense>
      <div className="prompt_layout mt-4">
        {prompts && prompts.length > 0 ? (
          prompts.map((prompt) => (
            <PromptCard key={prompt._id} prompt={prompt} />
          ))
        ) : (
          // <div className="text-center py-12">
          //   <Typography variant="h4">No prompts found</Typography>
          //   <Typography variant="p" className="mt-2">
          //     Start by creating your first prompt above.
          //   </Typography>
          //   </div>
             <EmptyState
            message="No prompts found"
            actionLabel="Create Prompt"
            actionHref="/create-prompt"
          />
        )}
      </div>
    </div>
  );
};

export default Profile;
