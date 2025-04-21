"use client";

import { useActionState, useEffect, useState } from "react";
import { Button } from "./ui/button";
import { IconCheck, IconCopy, IconHeart, IconShare } from "./ui/icons";
import useCustomSearchParams from "@/lib/hooks/use-custom-search.hook";
import { deletePrompt, likePrompt } from "@/app/utils/action";
import { cn } from "@/lib/utils";
import { UseErrorToast } from "@/lib/toast";
import useIsMobile from "@/lib/hooks/use-mobile-view.hook";
import useNavbarScroll from "@/lib/hooks/use-navbar-scroll";
import Search from "./search";

export const SharePrompt = ({ prompt }: { prompt: string }) => {
  const handleShareClick = () => {
    navigator.clipboard.writeText(prompt);
    const chatGPTURL = `https://chat.openai.com`;
    window.open(chatGPTURL, "_blank");
  };
  return (
    <div className="flex items-center gap-x-1">
      <Button
        variant="ghost"
        className="h-6 w-6 p-0 hover:bg-background"
        onClick={(e) => {
          e.stopPropagation();
          handleShareClick();
        }}
      >
        <IconShare className="cursor-pointer" />
        <span className="sr-only">Share</span>
      </Button>
    </div>
  );
};

export const CopyPrompt = ({ prompt }: { prompt: string }) => {
  const [copied, setCopied] = useState<string>("");

  const handleCopy = () => {
    setCopied(prompt);
    navigator.clipboard.writeText(prompt);
    setTimeout(() => setCopied(""), 3000);
  };
  return (
    <div className="flex items-center gap-x-1">
      <Button
        variant="ghost"
        className="h-6 w-6 p-0 hover:bg-background transition-all duration-200"
        onClick={(e) => {
          e.stopPropagation();
          handleCopy();
        }}
      >
        {copied === prompt ? (
          <>
            <IconCheck className="text-green-600"/>
            <span className="sr-only">Copied</span>
          </>
        ) : (
          <>
            <IconCopy className="cursor-pointer"/>
            <span className="sr-only">Copy</span>
          </>
        )}
      </Button>
    </div>
  );
};

export const PromptTag = ({ tag }: { tag: string }) => {
  const { handleSetParams } = useCustomSearchParams("TAG");

  return (
    <div className="">
      <p
        className="text-sm text-blue-500 cursor-pointer hover:underline w-fit"
        onClick={(e) => {
          e.stopPropagation();
          handleSetParams(true, tag);
        }}
      >
        #{tag}
      </p>
    </div>
  );
};

export const DeletePrompt = ({ prompt_id }: { prompt_id: string }) => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [_, action, isPending] = useActionState(deletePrompt, {});
  return (
    <form action={action}>
      <input
        type="text"
        name="id"
        defaultValue={prompt_id}
        className="hidden"
      />
      <button
        className="font-inter text-sm text-red-500 dark:text-red-600 cursor-pointer"
      >
        {isPending ? "Deleting..." : "Delete"}
      </button>
    </form>
  );
};

export const LikePrompt = ({
  prompt_id,
  liked,
  likes,
}: { prompt_id: string } & ILikePrompt) => {
  const initialState: LikePromptActionState = {
    data: {
      liked,
      likes,
    },
  };
  const [state, action, isPending] = useActionState(likePrompt, initialState);
  const resolvedLiked = Boolean(state?.data?.liked);
  
  useEffect(() => {
    if (state.errors?.general) {
      UseErrorToast(state.errors?.general[0] || "");
    }
  }, [state.errors?.general]);
  return (
    <form action={action} className="flex items-center gap-1">
      <input
        type="text"
        name="id"
        defaultValue={prompt_id}
        className="hidden"
      />
      <Button
        type="submit"
        variant="ghost"
        size="sm"
        className="p-1 h-auto cursor-pointer"
        disabled={isPending}
      >
        <IconHeart
          filled={resolvedLiked}
          className={cn(
            "transition-colors",
            resolvedLiked ? "text-red-500" : "text-gray-600"
          )}
        />
      </Button>
      <span className="text-sm text-gray-600">{Number(state?.data?.likes)}</span>
    </form>
  );
};

export const FeedSearch = ({ tags = []}: {tags?: _ITrendingTags[]}) => {

  const isMobile = useIsMobile();
  const isNavbarFixed = useNavbarScroll();
  return (
    <>
      {!(isMobile && isNavbarFixed) && <Search entityType="QUERY" tags={tags} />}
    </>
  );
}
