import React, { Suspense } from "react";
import PromptCard from "./PromptCard";
import {
  getPromptsByCreator,
  getBookmarks as getBookmarkedPrompts,
  getPrompts as getLikedPrompts,
} from "@/app/utils/action";
import { Typography } from "./ui/typography";
import dynamic from "next/dynamic";
import EmptyState from "./Empty";
import Link from "next/link";
import { Button } from "./ui/button";
import { IconPlus } from "./ui/icons";

interface ProfileProps {
  searchParam: _ISearchQuery;
  id: string;
  tab: "prompts" | "bookmarks" | "liked" | "stats";
}

const Search = dynamic(() => import("@/components/search"), {
  loading: () => <Typography variant="span">Loading...</Typography>,
});

const Profile = async ({ id, searchParam, tab }: ProfileProps) => {
  const { size = 10, page = 1, query = "", tag } = searchParam;

  let prompts;
  let title;
  let emptyMessage;

  switch (tab) {
    case "prompts":
      prompts = (await getPromptsByCreator(id, query, tag, size, page)).data;
      title = "Your Prompts";
      emptyMessage = "You haven't created any prompts yet";
      break;
    case "bookmarks":
      prompts = (await getBookmarkedPrompts(query, tag, size, page)).data;
      title = "Bookmarked Prompts";
      emptyMessage = "You haven't bookmarked any prompts yet";
      break;
    case "liked":
      prompts = (await getLikedPrompts(query, tag, 'newest', size, page)).data;
      title = "Liked Prompts";
      emptyMessage = "You haven't liked any prompts yet";
      break;
    case "stats":
      // Stats implementation would go here
      return (
        <div className="bg-white dark:bg-gray-800 rounded-lg p-6">
          <Typography variant="h3" className="font-semibold mb-4">
            Your Statistics
          </Typography>
          <p>Statistics dashboard will be implemented here</p>
        </div>
      );
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <Typography variant="h3" className="font-semibold">
            {title}
          </Typography>
          {prompts && (
            <Typography variant="p">
              {prompts?.length || 0}{" "}
              {prompts?.length === 1 ? "prompt" : "prompts"}
            </Typography>
          )}
        </div>

        {tab === "prompts" && (
          <Link href="/prompts/create" passHref>
            <Button className="gap-2">
              <IconPlus className="h-4 w-4" />
              Create New Prompt
            </Button>
          </Link>
        )}
      </div>

      <Suspense>
        <Search entityType="QUERY" />
      </Suspense>

      <div className="prompt_layout mt-4">
        {prompts && prompts.length > 0 ? (
          prompts.map((prompt) => (
            <PromptCard
              key={prompt._id}
              prompt={prompt}
              showActions={tab === "prompts"}
            />
          ))
        ) : (
          <EmptyState
            title={emptyMessage}
            message={
              query || tag
                ? "Try a different search query"
                : tab === "prompts"
                ? "Get started by creating your first prompt"
                : `Browse prompts to ${
                    tab === "liked" ? "like" : "bookmark"
                  } them`
            }
            actionLabel={tab === "prompts" ? "Create Prompt" : "Browse Prompts"}
            actionHref={tab === "prompts" ? "/create-prompt" : "/explore"}
          />
        )}
      </div>
    </div>
  );
};

export default Profile;
