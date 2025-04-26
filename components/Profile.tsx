import React, { Suspense } from "react";
import PromptCard from "./PromptCard";
import {
  getPromptsByCreator,
  getBookmarks as getBookmarkedPrompts,
  getPrompts as getLikedPrompts,
  getTrendingTags,
} from "@/app/utils/action";
import { Typography } from "./ui/typography";
import dynamic from "next/dynamic";
import EmptyState from "./Empty";
import Link from "next/link";
import { IconPlus } from "./ui/icons";
import { SearchSkeleton } from "./skeletons/promptListSkeleton";
import { Statistics } from "./statistics";

interface ProfileProps {
  searchParam: _ISearchQuery;
  id: string;
  tab: "prompts" | "bookmarks" | "liked" | "stats";
}

const Search = dynamic(
  () => import("@/components/promptClients").then((mod) => mod.FeedSearch),
  {
    loading: () => <SearchSkeleton />,
  }
);

const Profile = async ({ id, searchParam, tab }: ProfileProps) => {
  const { size = 10, page = 1, query = "", tag } = searchParam;

  let prompts: IPrompt[] = [];
  let tags: _ITrendingTags[] = [];
  let title = "";
  let emptyMessage = "";

  // Prepare the tags request once
  const tagsPromise = getTrendingTags(5).then((res) => res.data || []);

  // Handle prompts based on the tab
  let promptsPromise: Promise<IPrompt[]> | null = null;

  switch (tab) {
    case "prompts":
      promptsPromise = getPromptsByCreator(id, query, tag, size, page).then(
        (res) => res.data || []
      );
      title = "Your Prompts";
      emptyMessage = "You haven't created any prompts yet";
      break;
    case "bookmarks":
      promptsPromise = getBookmarkedPrompts(query, tag, size, page).then(
        (res) => res.data || []
      );
      title = "Bookmarked Prompts";
      emptyMessage = "You haven't bookmarked any prompts yet";
      break;
    case "liked":
      promptsPromise = getLikedPrompts(query, tag, "newest", size, page).then(
        (res) => res.data || []
      );
      title = "Liked Prompts";
      emptyMessage = "You haven't liked any prompts yet";
      break;
    case "stats":
      return <Statistics />;
  }

  if (promptsPromise) {
    [prompts, tags] = await Promise.all([promptsPromise, tagsPromise]);
  }

  return (
    <div className="space-y-6 ">
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
          <Link
            href="/prompts/create-prompt"
            className="px-8 py-3 text-sm font-semibold text-white transition-all duration-300 bg-blue-600 rounded-full shadow-lg hover:bg-blue-700 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600 dark:bg-blue-500 dark:hover:bg-blue-600 flex gap-2 items-center"
          >
            <IconPlus />
            Create Prompt
          </Link>
        )}
      </div>

      <Suspense>
        <Search tags={tags} />
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
            actionHref={
              tab === "prompts" ? "/prompts/create-prompt" : "/explore"
            }
          />
        )}
      </div>
    </div>
  );
};

export default Profile;
