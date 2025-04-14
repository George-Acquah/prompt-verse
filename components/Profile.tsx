import React, { Suspense } from "react";
import PromptCard from "./PromptCard";
import { getPromptsByCreator } from "@/app/utils/action";
import { Typography } from "./ui/typography";
import dynamic from "next/dynamic";

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

  if (!prompts) {
    return;
  }

  return (
    <div className="">
      <Suspense>
        <Search entityType="QUERY" />
      </Suspense>
      <div className="mt-16 prompt_layout">
        {prompts.length > 0 ? (
          prompts.map((prompt) => (
            <PromptCard key={prompt._id} prompt={prompt} />
          ))
        ) : (
          <p>No Prompts found</p>
        )}
      </div>
    </div>
  );
};

export default Profile;
