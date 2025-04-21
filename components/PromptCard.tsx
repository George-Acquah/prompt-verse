import React from "react";
import Image from "next/image";
import Link from "next/link";
import {
  CopyPrompt,
  DeletePrompt,
  LikePrompt,
  PromptTag,
  SharePrompt,
} from "./promptClients";
import { auth } from "@/auth";

type Props = {
  prompt: IPrompt;
};

const PromptCard = async ({ prompt }: Props) => {
  const session = await auth();
  return (
    <div className="prompt_card group">
      {/* Clickable overlay for the main card content */}
      <Link
        href={`/prompts/${prompt._id}`}
        className="absolute inset-0 z-0"
        aria-label={`View prompt details: ${prompt.prompt.substring(0, 30)}...`}
      />

      <div className="relative z-10 p-2  flex flex-col">
        <div className="flex justify-between items-start gap-5">
          <div className="flex-1 flex justify-start items-center gap-3">
            <Image
              src={prompt.creator.image}
              alt="user_img"
              width={40}
              height={40}
              className="relative rounded-full object-contain"
            />
            <div className="flex flex-col">
              <Link
                href={
                  prompt.creator._id === session?.user?.id
                    ? `/profile`
                    : `/profile/${prompt.creator._id}?name=${prompt.creator.username}`
                }
                className="relative z-20 font-satoshi font-semibold text-gray-900 dark:text-gray-100 hover:underline"
                // onClick={(e) => e.stopPropagation()}
              >
                {prompt.creator.username}
              </Link>
              <p className="font-inter text-sm text-gray-500 dark:text-gray-400">
                {prompt.creator.email}
              </p>
            </div>
          </div>

          {/* Copy/Share buttons */}
          <div className="relative z-20 flex items-center gap-x-1">
            <CopyPrompt prompt={prompt.prompt} />
            <SharePrompt prompt={prompt.prompt} />
          </div>
        </div>

        <div className="mt-2 mb-2 min-w-0 flex-grow h-10">
          <p
            className="font-satoshi text-sm text-gray-700 dark:text-gray-300 
       line-clamp-2"
            title={prompt.prompt}
          >
            {prompt.prompt}
          </p>
        </div>
        <div className="flex-1 flex items-center gap-3 mt-2">
          <PromptTag tag={prompt.tag} />
          <div
            className={`px-4 flex-center rounded-full ${
              prompt.private ? "bg-green-500" : "bg-gray-400"
            }`}
          >
            <span>{prompt.private ? "private" : "public"}</span>
          </div>
        </div>
      </div>

      {session?.user && (
        <div className="relative z-10 flex flex-between mt-2 gap-5 border-t border-gray-200 dark:border-gray-700 pt-4 p-2 h-12">
          <LikePrompt
            prompt_id={prompt._id}
            likes={prompt.likes}
            liked={prompt.likedBy.includes(session?.user?.id || "")}
          />
          {session?.user?.id === prompt.creator._id && (
            <div className="flex-end gap-5">
              <DeletePrompt prompt_id={prompt._id} />
              <Link
                href={`/prompts/${prompt._id}/update-prompt`}
                className="blue_btn"
              >
                Edit
              </Link>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default PromptCard;
